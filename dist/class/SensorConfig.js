"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
/**
 * Class of the configuration file containing configuration of IRSensors.
 *
 * @export
 * @class SensorConfig
 * @extends {Array<IRSensor>}
 */
class SensorConfig extends Array {
    constructor(array) {
        super(...array);
    }
    /**
     * SensorConfig factory
     * @param array array of IRSensor
     */
    static create(array) {
        return Object.create(SensorConfig.prototype)(array);
    }
    /**
     * Return the SensorCode having a corresponding SensorCode into the configuration file or return undefined if none is matching.
     *
     * @static
     * @param {SensorCode} code
     * @returns {(IRSensor|undefined)}
     * @memberof SensorConfig
     */
    find_sensor_in_config_from_sensorcode(code) {
        console.debug("Searching code " + code + " in configuration");
        let ret = undefined;
        //search according to sensorcodes
        ret = lodash_1.default.find(this, function (sensor) { return sensor.detection_code == code || sensor.lowbattery_code == code; });
        return ret;
    }
}
exports.SensorConfig = SensorConfig;
