import { SensorCode } from "./SensorCode";

/**
 * Class corresponding to an IRSensor emitting 433MHz signals when detecting a movement or low battery.
 *
 * @export
 * @class IRSensor
 */
export class IRSensor {
    name: string;
    detection_code: SensorCode;
    lowbattery_code: SensorCode;
    constructor(name: string, detection_code: SensorCode, lowbattery_code: SensorCode) {
        this.name = name;
        this.detection_code = detection_code;
        this.lowbattery_code = lowbattery_code;
    }
}
