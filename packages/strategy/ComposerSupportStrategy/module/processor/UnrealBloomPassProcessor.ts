import { CONFIGTYPE, defineProcessor } from "@vis-three/middleware";
import { Vector2 } from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { PASS_CONFIGTYPE } from "../constant";
import { ComposerSupportEngine } from "../PassCompiler";
import { UnrealBloomPassConfig } from "../PassConfig";

export default defineProcessor<
  UnrealBloomPassConfig,
  UnrealBloomPass,
  ComposerSupportEngine
>({
  configType: PASS_CONFIGTYPE.UNREALBLOOMPASS,
  create(config, engine): UnrealBloomPass {
    const pixelRatio = window.devicePixelRatio;

    const pass = new UnrealBloomPass(
      new Vector2(
        engine.dom
          ? engine.dom.offsetWidth * pixelRatio
          : window.innerWidth * pixelRatio,
        engine.dom
          ? engine.dom.offsetHeight * pixelRatio
          : window.innerWidth * pixelRatio
      ),
      config.strength,
      config.radius,
      config.threshold
    );

    return pass;
  },
  dispose(pass) {
    pass.dispose();
  },
});
