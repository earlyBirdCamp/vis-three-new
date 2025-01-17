import { EngineSupport, EngineSupportParameters } from "@vis-three/middleware";
import {
  Screenshot,
  WebGLRendererEngine,
  WebGLRendererPlugin,
} from "@vis-three/webgl-renderer-plugin";
import {
  CSS2DRendererEngine,
  CSS2DRendererPlugin,
} from "@vis-three/css2d-renderer-plugin";
import {
  CSS3DRendererEngine,
  CSS3DRendererPlugin,
} from "@vis-three/css3d-renderer-plugin";
import {
  EffectComposerEngine,
  EffectComposerPlugin,
} from "@vis-three/effect-composer-plugin";
import {
  OrbitControlsEngine,
  OrbitControlsPlugin,
} from "@vis-three/orbit-controls-plugin";
import { CameraAdaptivePlugin } from "@vis-three/camera-adaptive-plugin";

import { CSS2DRenderStrategy } from "@vis-three/css2d-render-strategy";
import { CSS3DRenderStrategy } from "@vis-three/css3d-render-strategy";
import { EffectRenderStrategy } from "@vis-three/effect-render-strategy";
import { OrbitRenderStrategy } from "@vis-three/orbit-render-strategy";
import { WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import {
  ComposerSupportStrategy,
  PassDataSupport,
  PASS_CONFIGTYPE,
} from "@vis-three/composer-support-strategy";
import { CSS3DRendererSupportStrategy } from "@vis-three/css3d-renderer-support-strategy";
import { WebGLRendererSupportStrategy } from "@vis-three/webgl-renderer-support-strategy";
import { OrbitControlsSupportStrategy } from "@vis-three/orbit-controls-support-strategy";

export { PassDataSupport, PASS_CONFIGTYPE };

export class DisplayEngineSupport
  extends EngineSupport
  implements
    WebGLRendererEngine,
    EffectComposerEngine,
    OrbitControlsEngine,
    CSS2DRendererEngine,
    CSS3DRendererEngine
{
  declare webGLRenderer: WebGLRenderer;
  declare getScreenshot: (params?: Screenshot | undefined) => Promise<string>;
  declare effectComposer: EffectComposer;
  declare orbitControls;
  declare css2DRenderer: CSS2DRenderer;
  declare css3DRenderer: CSS3DRenderer;

  constructor(parameters?: EngineSupportParameters) {
    super(parameters);
    this.install(
      WebGLRendererPlugin({
        antialias: true,
        alpha: true,
      })
    )
      .install(CSS2DRendererPlugin())
      .install(CSS3DRendererPlugin())
      .install(
        EffectComposerPlugin({
          WebGLMultisampleRenderTarget: true,
        })
      )
      .install(OrbitControlsPlugin())
      .install(CameraAdaptivePlugin());

    this.exec(CSS2DRenderStrategy())
      .exec(CSS3DRenderStrategy())
      .exec(EffectRenderStrategy())
      .exec(OrbitRenderStrategy())
      .exec(ComposerSupportStrategy())
      .exec(CSS3DRendererSupportStrategy())
      .exec(WebGLRendererSupportStrategy())
      .exec(OrbitControlsSupportStrategy());
  }
}
