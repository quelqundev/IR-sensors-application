import _ from 'lodash';
import { IRSensor } from "./IRSensor";
import { SensorCode } from './SensorCode';

/**
 * Class of the configuration file containing configuration of IRSensors.
 *
 * @export
 * @class SensorConfig
 * @extends {Array<IRSensor>}
 */
export class SensorConfig extends Array<IRSensor> {

    private constructor(array: Array<IRSensor>)
    {
        super(...array);
    }

    /**
     * SensorConfig factory
     * @param array array of IRSensor
     */
    static create(array: Array<IRSensor>)
    {
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
    find_sensor_in_config_from_sensorcode(code:SensorCode) : IRSensor|undefined {
        console.debug("Searching code " + code + " in configuration");
        let ret: IRSensor|undefined = undefined;
        //search according to sensorcodes
        ret = _.find(this, function (sensor: IRSensor) { return sensor.detection_code == code || sensor.lowbattery_code == code; });
        return ret;
    }
}
