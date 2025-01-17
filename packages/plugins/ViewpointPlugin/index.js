import { ENGINE_EVENT, } from "@vis-three/core";
import { OrthographicCamera, PerspectiveCamera } from "three";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export var VIEWPOINT;
(function (VIEWPOINT) {
    VIEWPOINT["DEFAULT"] = "default";
    VIEWPOINT["TOP"] = "top";
    VIEWPOINT["BOTTOM"] = "bottom";
    VIEWPOINT["LEFT"] = "left";
    VIEWPOINT["RIGHT"] = "right";
    VIEWPOINT["FRONT"] = "front";
    VIEWPOINT["BACK"] = "back";
})(VIEWPOINT || (VIEWPOINT = {}));
export const SETVIEWPOINT = "setViewpoint";
export const VIEWPOINT_PLUGIN = transPkgName(pkgname);
export const ViewpointPlugin = function (params = {}) {
    !params.perspective && (params.perspective = {});
    !params.perspective.position &&
        (params.perspective.position = {
            x: 60,
            y: 60,
            z: 60,
        });
    !params.perspective.lookAt &&
        (params.perspective.lookAt = {
            x: 0,
            y: 0,
            z: 0,
        });
    !params.perspective.up &&
        (params.perspective.up = {
            x: 0,
            y: 1,
            z: 0,
        });
    !params.orthograpbic && (params.orthograpbic = {});
    !params.orthograpbic.up &&
        (params.orthograpbic.up = {
            x: 0,
            y: 1,
            z: 0,
        });
    const perspectiveCamera = new PerspectiveCamera();
    perspectiveCamera.position.set(params.perspective.position.x, params.perspective.position.y, params.perspective.position.z);
    perspectiveCamera.lookAt(params.perspective.lookAt.x, params.perspective.lookAt.y, params.perspective.lookAt.z);
    perspectiveCamera.up.set(params.perspective.up.x, params.perspective.up.y, params.perspective.up.z);
    const distance = params.orthograpbic.distance || 10000;
    const orthograpbicCamera = new OrthographicCamera(-window.innerWidth / 8, window.innerWidth / 8, -window.innerHeight / 8, window.innerHeight / 8, 0, distance);
    orthograpbicCamera.up.set(params.perspective.up.x, params.perspective.up.y, params.perspective.up.z);
    const allowRotate = params.orthograpbic.allowRotate ?? false;
    let setSizeFun;
    let viewpointFun;
    return {
        name: VIEWPOINT_PLUGIN,
        install(engine) {
            engine.setViewpoint = function (viewpoint) {
                this.dispatchEvent({
                    type: SETVIEWPOINT,
                    viewpoint,
                });
                return this;
            };
            setSizeFun = (event) => {
                const width = event.width;
                const height = event.height;
                const aspect = width / height;
                perspectiveCamera.aspect = aspect;
                perspectiveCamera.updateProjectionMatrix();
                orthograpbicCamera.left = -distance * aspect;
                orthograpbicCamera.right = distance * aspect;
                orthograpbicCamera.top = distance;
                orthograpbicCamera.bottom = -distance;
                orthograpbicCamera.zoom = (distance / height) * 5;
                orthograpbicCamera.updateProjectionMatrix();
            };
            engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            viewpointFun = (event) => {
                const viewpoint = event.viewpoint;
                if (viewpoint === VIEWPOINT.DEFAULT) {
                    engine.setCamera(perspectiveCamera);
                    return;
                }
                if (viewpoint === VIEWPOINT.TOP) {
                    orthograpbicCamera.position.set(0, distance / 2, 0);
                }
                else if (viewpoint === VIEWPOINT.BOTTOM) {
                    orthograpbicCamera.position.set(0, -distance / 2, 0);
                }
                else if (viewpoint === VIEWPOINT.RIGHT) {
                    orthograpbicCamera.position.set(distance / 2, 0, 0);
                }
                else if (viewpoint === VIEWPOINT.LEFT) {
                    orthograpbicCamera.position.set(-distance / 2, 0, 0);
                }
                else if (viewpoint === VIEWPOINT.FRONT) {
                    orthograpbicCamera.position.set(0, 0, distance / 2);
                }
                else if (viewpoint === VIEWPOINT.BACK) {
                    orthograpbicCamera.position.set(0, 0, -distance / 2);
                }
                orthograpbicCamera.lookAt(0, 0, 0);
                engine.setCamera(orthograpbicCamera);
            };
            engine.addEventListener(SETVIEWPOINT, viewpointFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.removeEventListener(SETVIEWPOINT, viewpointFun);
        },
    };
};
