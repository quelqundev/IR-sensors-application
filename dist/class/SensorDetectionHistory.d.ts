import { IRSensor } from "./IRSensor";
export declare class SensorDetectionHistory extends Map<string, number> {
    reset_sensor_history(sensor: IRSensor): void;
    reset_sensors_history(IRSensor_list: Array<IRSensor>): void;
    reset_all_history(): void;
    increment_history(sensor: IRSensor): void;
}
