"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SensorDetectionHistory extends Map {
    reset_sensor_history(sensor) {
        this.set(sensor.name, 0);
    }
    reset_sensors_history(IRSensor_list) {
        IRSensor_list.forEach(sensor => {
            this.reset_sensor_history(sensor);
        });
    }
    reset_all_history() {
        this.clear();
    }
    increment_history(sensor) {
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
exports.SensorDetectionHistory = SensorDetectionHistory;
