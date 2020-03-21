import { IRSensor } from "./IRSensor";

export class SensorDetectionHistory extends Map<string, number> {
    reset_sensor_history(sensor: IRSensor) {
        this.set(sensor.name, 0);
    }
    reset_sensors_history(IRSensor_list: Array<IRSensor>) {
        IRSensor_list.forEach(sensor => {
            this.reset_sensor_history(sensor);
        });
    }
    reset_all_history() {
        this.clear();
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
