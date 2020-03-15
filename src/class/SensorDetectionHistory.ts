import { IRSensor } from "./IRSensor";
import { SensorConfig } from "./SensorConfig";
export class SensorDetectionHistory extends Map<string, number> {
    reset_sensor_history(IRSensors: IRSensor) {
        this.set(IRSensor.name, 0);
    }
    reset_sensors_history(IRSensor_list: Array<IRSensor>) {
        IRSensor_list.forEach(sensor => {
            this.reset_sensor_history(sensor);
        });
    }
    reset_all_history() {
        let IRSensor_list: Array<IRSensor> = [];
        IRSensor_list = SensorConfig.get_sensors_list_from_configuration();
        this.reset_sensors_history(IRSensor_list);
    }
    increment_history(sensor: IRSensor) {
        let current = this.get(sensor.name);
        if (current != undefined) {
            this.set(sensor.name, current + 1);
        }
        else {
            console.error("Trying to increment an undefined history for sensor " + sensor.name);
            this.reset_sensor_history(sensor);
        }
    }
}
