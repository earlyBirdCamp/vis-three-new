import { Scene } from 'three';
import { ModelingScene } from './../extends/ModelingScene/ModelingScene';
import { TRANSFORMEVENT, VisTransformControls } from "../optimize/VisTransformControls";
export const TransformControlsPlugin = function (params) {
    if (this.transformControls) {
        console.warn('this has installed transformControls plugin.');
        return false;
    }
    if (!this.webGLRenderer) {
        console.warn('this must install renderer before install transformControls plugin.');
        return false;
    }
    if (!this.pointerManager) {
        console.warn('this must install pointerManager before install transformControls plugin.');
        return false;
    }
    if (!this.eventManager) {
        console.warn('this must install eventManager before install transformControls plugin.');
        return false;
    }
    const transformControls = new VisTransformControls(this.currentCamera, this.dom);
    this.transformControls = transformControls;
    this.transing = false;
    transformControls.addEventListener('mouseDown', () => {
        this.transing = true;
    });
    if (this.scene instanceof Scene) {
        this.scene.add(this.transformControls);
        this.scene.add(this.transformControls.target);
    }
    else if (this.scene instanceof ModelingScene) {
        this.scene._add(this.transformControls);
        this.scene._add(this.transformControls.target);
    }
    this.setTransformControls = function (show) {
        this.transformControls.visible = show;
        return this;
    };
    this.addEventListener('setCamera', event => {
        transformControls.setCamera(event.camera);
    });
    this.eventManager.addEventListener('pointerup', (event) => {
        if (this.transing) {
            return;
        }
        if (event.button === 0) {
            const objectList = event.intersections.map((elem) => elem.object);
            transformControls.setAttach(objectList[0]);
        }
    });
    this.completeSet.add(() => {
        if (this.IS_ENGINESUPPORT) {
            const objectToConfig = (object) => {
                const symbol = this.compilerManager.getObjectSymbol(object);
                if (!symbol) {
                    return null;
                }
                return this.dataSupportManager.getObjectConfig(symbol);
            };
            let config = null;
            let mode;
            transformControls.addEventListener(TRANSFORMEVENT.OBJECTCHANGED, (event) => {
                const e = event;
                e.transObjectSet.forEach(object => {
                    config = objectToConfig(object);
                    mode = e.mode;
                    if (config) {
                        config[mode].x = object[mode].x;
                        config[mode].y = object[mode].y;
                        config[mode].z = object[mode].z;
                    }
                });
            });
        }
    });
    return true;
};
//# sourceMappingURL=TransformControlsPlugin.js.map