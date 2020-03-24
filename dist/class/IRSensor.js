"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class corresponding to an IRSensor emitting 433MHz signals when detecting a movement or low battery.
 *
 * @export
 * @class IRSensor
 */
class IRSensor {
    constructor(name, detection_code, lowbattery_code) {
        this.name = name;
        this.detection_code = detection_code;
        this.lowbattery_code = lowbattery_code;
    }
}
exports.IRSensor = IRSensor;
