import { BasicEventConfig, EventGenerator, Vector3Config } from "@vis-three/middleware";
import { TIMINGFUNCTION } from "./common";
export interface moveFromTo extends BasicEventConfig {
    params: {
        target: string;
        from: Vector3Config;
        to: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
    };
}
export declare const config: moveFromTo;
export declare const generator: EventGenerator<moveFromTo>;
