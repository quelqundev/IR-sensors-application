import { SensorCode } from "./class/SensorCode";
import { SensorConfig } from "./class/SensorConfig";
import { IRSensor } from "./class/IRSensor";
import { SensorApplication } from "./class/SensorApplication";

const pin = 0;
let sensor1 = new IRSensor("sensor1", 111, 222);
let sensor2 = new IRSensor("sensor1", 333, 444);
let sensors_array:Array<IRSensor> = []
sensors_array.push(sensor1);
sensors_array.push(sensor2);
const config: SensorConfig = new SensorConfig(sensors_array);

let sensorapp: SensorApplication = new SensorApplication(
    pin,
    config,
    notify_users_detection,
    notify_users_lowbattery,
    notify_users_unknown_code
);

function notify_users_detection(ret: SensorApplication) {
    ret.detection_history.forEach((value, key) => {
        console.log(key, value);
        //TODO send SMS with values
    });
    //reset history when sending sms
    sensorapp.detection_history.reset_all_history();
}

function notify_users_lowbattery(ret: SensorApplication) {
    //TODO send SMS with values
    ret.lowbattery_history.forEach((value, key) => {
        console.log(key, value);
    });
    //reset history when sending sms
    sensorapp.lowbattery_history.reset_all_history();
}

function notify_users_unknown_code(code: SensorCode) {
    //TODO send SMS with values
}
