import { Strategy } from "@vis-three/core";
import {
  LoaderManager,
  LOADER_MANAGER_PLUGIN,
  LoadUnit,
} from "@vis-three/loader-manager-plugin";
import {
  MappedEvent,
  ResourceManagerEngine,
  RESOURCE_EVENT,
  RESOURCE_MANAGER_PLUGIN,
} from "../../plugin/ResourceManagerPlugin";

export interface LoaderMappingEngine extends ResourceManagerEngine {
  loaderManager: LoaderManager;
  loadResources: (
    urlList: Array<LoadUnit>,
    callback: (err: Error | undefined, event?: MappedEvent) => void
  ) => LoaderMappingEngine;
  loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<MappedEvent>;
}

export const LOADER_MAPPING_STRATEGY = "LoaderMappingStrategy";

export const LoaderMappingStrategy: Strategy<LoaderMappingEngine> =
  function () {
    let cacheLoadResources: (
      urlList: Array<LoadUnit>,
      callback: (err: Error | undefined, event?: MappedEvent) => void
    ) => LoaderMappingEngine;

    let cacheAsync: (urlList: Array<LoadUnit>) => Promise<MappedEvent>;

    return {
      name: LOADER_MAPPING_STRATEGY,
      condition: [RESOURCE_MANAGER_PLUGIN, LOADER_MANAGER_PLUGIN],
      exec(engine) {
        cacheLoadResources = engine.loadResources;

        engine.loadResources = (
          urlList: Array<LoadUnit>,
          callback: (err: Error | undefined, event?: MappedEvent) => void
        ) => {
          const lodedFun = (event: MappedEvent) => {
            callback(undefined, event);
            engine.resourceManager.removeEventListener<MappedEvent>(
              RESOURCE_EVENT.MAPPED,
              lodedFun
            );
          };

          try {
            engine.resourceManager.addEventListener<MappedEvent>(
              RESOURCE_EVENT.MAPPED,
              lodedFun
            );
          } catch (error) {
            callback(error as Error);
          }
          engine.loaderManager.load(urlList);
          return engine;
        };

        cacheAsync = engine.loadResourcesAsync;

        engine.loadResourcesAsync = (
          urlList: Array<LoadUnit>
        ): Promise<MappedEvent> => {
          return new Promise((resolve, reject) => {
            const lodedFun = (event: MappedEvent) => {
              resolve(event);
              engine.resourceManager.removeEventListener<MappedEvent>(
                RESOURCE_EVENT.MAPPED,
                lodedFun
              );
            };

            try {
              engine.resourceManager.addEventListener<MappedEvent>(
                RESOURCE_EVENT.MAPPED,
                lodedFun
              );
            } catch (error) {
              reject(error);
            }

            engine.loaderManager.load(urlList);
          });
        };
      },
      rollback(engine) {
        engine.loadResources = cacheLoadResources;
        engine.loadResourcesAsync = cacheAsync;
      },
    };
  };