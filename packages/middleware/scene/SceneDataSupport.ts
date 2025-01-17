import { Scene } from "three";
import { MODULETYPE } from "../constants";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SceneCompiler } from "./SceneCompiler";
import { getSceneConfig, SceneConfig } from "./SceneConfig";
import { SceneRule } from "./SceneRule";

export class SceneDataSupport extends ObjectDataSupport<
  SceneConfig,
  Scene,
  SceneCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.SCENE;

  constructor(data: Array<SceneConfig> = []) {
    super(SceneRule, data);
  }
}
