import { IRSensor } from "./IRSensor";
import { SensorCode } from './SensorCode';
/**
 * Class of the configuration file containing configuration of IRSensors.
 *
 * @export
 * @class SensorConfig
 * @extends {Array<IRSensor>}
 */
export declare class SensorConfig extends Array<IRSensor> {
    private constructor();
    /**
     * SensorConfig factory
     * @param array array of IRSensor
     */
    static create(array: Array<IRSensor>): any;
    /**
     * Return the SensorCode having a corresponding SensorCode into the configuration file or return undefined if none is matching.
     *
     * @static
     * @param {SensorCode} code
     * @returns {(IRSensor|undefined)}
     * @memberof SensorConfig
     */
    find_sensor_in_config_from_sensorcode(code: SensorCode): IRSensor | undefined;
}
