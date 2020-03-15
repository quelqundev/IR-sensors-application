import * as IRSensor_config_file from "../../sensors-config/sensors-configuration.json";
import _ from 'lodash';
import { IRSensor } from "./IRSensor";
import { SensorCode } from './SensorCode';
import fs from 'fs';

/**
 * Class of the configuration file containing configuration of IRSensors.
 *
 * @export
 * @class SensorConfig
 * @extends {Array<IRSensor>}
 */
export class SensorConfig extends Array<IRSensor> {

    /**
     * Return the list of IRSensor contained into the config file
     *
     * @static
     * @returns {Array<IRSensor>}
     * @memberof SensorConfig
     */
    static get_sensors_list_from_configuration(): Array<IRSensor> {
        let IRSensor_list: SensorConfig= [];
        let config_filepath_overriden: string|undefined = undefined;
    
        config_filepath_overriden = IRSensor_config_file["sensors-configuration"]["sensors-configuration-location"];
    
        //check if config file location is overriden
        if (config_filepath_overriden != "")
        {
            console.debug("config_filepath_overriden : " + config_filepath_overriden)
            //load secondary config file
            const secondary_file_str: string = fs.readFileSync(config_filepath_overriden,'utf8');
            console.debug(secondary_file_str);    
            let secondary_config_file = JSON.parse(secondary_file_str);
            IRSensor_list = secondary_config_file["sensors-configuration"]["sensors-configuration-array"];
            console.debug(IRSensor_list);  
        }
        else
        {
            //load primary config file
            IRSensor_list = IRSensor_config_file["sensors-configuration"]["sensors-configuration-array"];
            console.debug(IRSensor_list);  
        }
        return IRSensor_list;
    }

    /**
     * Return the SensorCode having a corresponding SensorCode into the configuration file or return undefined if none is matching.
     *
     * @static
     * @param {SensorCode} code
     * @returns {(IRSensor|undefined)}
     * @memberof SensorConfig
     */
    static find_sensor_in_config_from_sensorcode(code:SensorCode) : IRSensor|undefined {
        console.debug("Searching code " + code + " in configuration file");
        let ret: IRSensor|undefined = undefined;
        let IRSensor_list: SensorConfig= [];
        IRSensor_list = SensorConfig.get_sensors_list_from_configuration();
        //search according to sensorcodes
        ret = _.find(IRSensor_list, function (sensor: IRSensor) { return sensor.detection_code == code || sensor.lowbattery_code == code; });
        return ret;
    }
}
