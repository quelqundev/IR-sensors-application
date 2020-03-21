# IR-sensors-application

This library allow you to manage IR-sensors sending detections signal, low battery signal on 433MHz bandwith.

This kind of sensors usually sends multiple signals to ensure a proper reception by the receiver then this library filters out the subsequent codes reception into a single callback event.

## Installation

You can add this library to your own project with npm :

`npm install --save git+https://github.com/quelqundev/IR-sensors-application.git`

## Usage

The index.js can be a good example :

```typescript
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
```
