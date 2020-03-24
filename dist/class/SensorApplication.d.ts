import { Receiver } from "433-utils";
import { SensorCode } from "./SensorCode";
import { SensorDetectionHistory } from "./SensorDetectionHistory";
import { SensorLowBatteryHistory } from "./SensorLowBatteryHistory";
import { SensorConfig } from "./SensorConfig";
import { IRSensor } from "./IRSensor";
/**
 * Class of the main application offering management of IRSensors received codes.
 *
 * @export
 * @class SensorApplication
 */
export declare class SensorApplication {
    /**
     * Pin number of the raspberry to listen to data
     */
    receiver: Receiver;
    /**
     * Configuration of IR sensors collection associating names and codes
     */
    config: SensorConfig;
    /**
     * History of detections for each sensor
     */
    detection_history: SensorDetectionHistory;
    /**
     * History of low battery signal reception for each sensor
     */
    lowbattery_history: SensorLowBatteryHistory;
    /**
     * Callback executed when detection signal is received
     */
    notify_users_detection_callback: (sensorapplication: SensorApplication) => void;
    /**
     * Callback executed when low battery signal is received
     */
    notify_users_lowbattery_callback: (sensorapplication: SensorApplication) => void;
    /**
     * Callback executed on reception of unknown code
     */
    unknowncode_received_callback: (code: SensorCode) => void;
    constructor(pin: number, config: SensorConfig, notify_users_detection_callback: (sensorapplication: SensorApplication) => void, notify_users_lowbattery_callback: (sensorapplication: SensorApplication) => void, unknowncode_received_callback: (code: SensorCode) => void);
    on_received_code(code: SensorCode): void;
    on_detection(sensor: IRSensor): void;
    on_lowbattery(sensor: IRSensor): void;
    on_unknown_code_received(code: SensorCode): void;
}
