import { SensorCode } from "./class/SensorCode";
import { SensorConfig } from "./class/SensorConfig";
import { IRSensor } from "./class/IRSensor";
import { SensorApplication } from "./class/SensorApplication";

const pin = 0;
let sensorapp: SensorApplication = new SensorApplication(pin, on_received_code);

function on_received_code(code: SensorCode) {
    //search config list
    let corresponding_sensor = SensorConfig.find_sensor_in_config_from_sensorcode(code);
    if (undefined != corresponding_sensor) {
        //if this code is corresponding to one of our sensors configuration
        //low_battery or detection ?
        if (code == corresponding_sensor.detection_code) {
            on_detection(corresponding_sensor);
        }
        else if (code == corresponding_sensor.lowbattery_code) {
            on_lowbattery(corresponding_sensor);
        }
        else {
            console.error();
        }
    }
    else {
        //this code is unknown
        on_unknown_code_received(code);
    }
}
function on_detection(sensor:IRSensor) {
    console.log("Detection signal of sensor : " + sensor.name);
}
function on_lowbattery(sensor:IRSensor) {
    console.log("Low Battery signal of sensor : " + sensor.name);
}
function on_unknown_code_received(code: SensorCode) {
    console.log("Unknown signal : " + code);
}
