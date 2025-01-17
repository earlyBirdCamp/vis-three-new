import { LinearEncoding, NoToneMapping, PCFShadowMap } from "three";
import { SymbolConfig, uniqueSymbol, Vector2Config } from "../common";
import { CONFIGTYPE } from "../constants/CONFIGTYPE";

export interface RendererConfig extends SymbolConfig {
  size: Vector2Config | null; // 为null 默认跟随canves
}

export interface ShadowMapConfig {
  enabled: boolean;
  autoUpdate: boolean;
  needsUpdate: boolean;
  type: number;
}

export interface WebGLRendererViewPort {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type WebGLRendererScissor = WebGLRendererViewPort;

export interface WebGLRendererConfig extends RendererConfig {
  clearColor: string;
  pixelRatio: number;
  outputEncoding: number;
  physicallyCorrectLights: boolean;
  shadowMap: ShadowMapConfig;
  toneMapping: number;
  toneMappingExposure: number;
  adaptiveCamera: boolean; // 适应相机
  viewport: WebGLRendererViewPort | null; // 为null 默认跟随canves
  scissor: WebGLRendererScissor | null; // 为null 默认跟随canves
}

export interface CSS3DRendererConfig extends RendererConfig {}

export type RendererConfigAllType = WebGLRendererConfig | CSS3DRendererConfig;

export const getRendererConfig = function (): RendererConfig {
  return {
    vid: "",
    type: "Renderer",
    size: null,
  };
};

export const getWebGLRendererConfig = function (): WebGLRendererConfig {
  return Object.assign(getRendererConfig(), {
    vid: uniqueSymbol(CONFIGTYPE.WEBGLRENDERER), // WebGLRenderer or vid
    type: CONFIGTYPE.WEBGLRENDERER,
    clearColor: "rgba(0, 0, 0, 0)",
    outputEncoding: LinearEncoding,
    physicallyCorrectLights: false,
    shadowMap: {
      enabled: false,
      autoUpdate: true,
      needsUpdate: false,
      type: PCFShadowMap,
    },
    toneMapping: NoToneMapping,
    toneMappingExposure: 1,
    pixelRatio: window.devicePixelRatio,
    adaptiveCamera: false,
    viewport: null,
    scissor: null,
  });
};

export const getCSS3DRenderereConfig = function (): CSS3DRendererConfig {
  return Object.assign(getRendererConfig(), {
    vid: uniqueSymbol(CONFIGTYPE.CSS3DRENDERER), // WebGLRenderer or vid
    type: CONFIGTYPE.CSS3DRENDERER,
  });
};
