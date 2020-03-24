import { SensorCode } from "./SensorCode";
/**
 * Class corresponding to an IRSensor emitting 433MHz signals when detecting a movement or low battery.
 *
 * @export
 * @class IRSensor
 */
export declare class IRSensor {
    name: string;
    detection_code: SensorCode;
    lowbattery_code: SensorCode;
    constructor(name: string, detection_code: SensorCode, lowbattery_code: SensorCode);
}
