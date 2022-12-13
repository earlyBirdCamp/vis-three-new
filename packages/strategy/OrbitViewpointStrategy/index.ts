import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";
import {
  OrbitControlsEngine,
  name as ORBIT_CONTROLS_PLUGIN,
} from "@vis-three/orbit-controls-plugin";
import {
  ViewpointEngine,
  ViewpointEvent,
  name as VIEWPOINT_PLUGIN,
  VIEWPOINT,
  SETVIEWPOINT,
} from "@vis-three/viewpoint-plugin";

export interface OrbitViewpointEngine
  extends OrbitControlsEngine,
    ViewpointEngine {}

export const name = transPkgName(pkgname);

export const CSS2DRenderStrategy: Strategy<OrbitViewpointEngine> = function () {
  let viewpointFun: (event: ViewpointEvent) => void;

  return {
    name,
    condition: [ORBIT_CONTROLS_PLUGIN, VIEWPOINT_PLUGIN],
    exec(engine) {
      const disableRotate = () => {
        engine.orbitControls.enableRotate = true;
      };

      const actionMap = {
        [VIEWPOINT.DEFAULT]: disableRotate,
        [VIEWPOINT.TOP]: disableRotate,
        [VIEWPOINT.BOTTOM]: disableRotate,
        [VIEWPOINT.RIGHT]: disableRotate,
        [VIEWPOINT.LEFT]: disableRotate,
        [VIEWPOINT.FRONT]: disableRotate,
        [VIEWPOINT.BACK]: disableRotate,
      };

      viewpointFun = (event) => {
        const viewpoint = event.viewpoint;

        engine.orbitControls.target.set(0, 0, 0);
        actionMap[viewpoint] && actionMap[viewpoint]();
      };

      engine.addEventListener<ViewpointEvent>(SETVIEWPOINT, viewpointFun);
    },
    rollback(engine) {
      engine.removeEventListener<ViewpointEvent>(SETVIEWPOINT, viewpointFun);
    },
  };
};