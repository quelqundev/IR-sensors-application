import { Receiver } from "433-utils";
import { SensorCode } from "./SensorCode";
import { SensorDetectionHistory } from "./SensorDetectionHistory";
import { SensorLowBatteryHistory } from "./SensorLowBatteryHistory";
import { SensorConfig } from "./SensorConfig";
import _ from "lodash";
/**
 * Class of the main application offering management of IRSensors received codes.
 *
 * @export
 * @class SensorApplication
 *
 * @param pin pin data used for the 433MHz receiver
 * @param config known sensors configuration
 * @param notify_users_detection_callback callback to debounced when a detection is received
 * @param notify_detection_debounceduration_ms debounce duration for detection callback execution
 * @param notify_users_lowbattery_callback callback to debounced when a lowbattery signal is received
 * @param notify_lowbattery_debounceduration_ms debounce duration for lowbattery callback execution
 * @param unknowncode_received_callback callback executed when an unknown signal is received
 */
export declare class SensorApplication {
    /**
     * Instance of the 433MHz listener
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
     * Debounced callback executed when detection signal is received
     */
    notify_users_detection_debounced_callback: ((sensorapplication: SensorApplication) => void) & _.Cancelable;
    /**
     * Debounced callback executed when low battery signal is received
     */
    notify_users_lowbattery_debounced_callback: ((sensorapplication: SensorApplication) => void) & _.Cancelable;
    /**
     * Callback executed on reception of unknown code
     */
    unknowncode_received_callback: (code: SensorCode) => void;
    constructor(pin: number, config: SensorConfig, notify_users_detection_callback: ((sensorapplication: SensorApplication) => void), notify_detection_debounceduration_ms: number, notify_users_lowbattery_callback: ((sensorapplication: SensorApplication) => void), notify_lowbattery_debounceduration_ms: number, unknowncode_received_callback: (code: SensorCode) => void);
    /**
     * Callback executed on 433MHz sensorcode reception
     * @param code SensorCode received by the 433MHz listener
     */
    private on_received_code;
    /**
     * Callback executed when the signal correspond the the detection code of one of the sensor listed in the configuration
     * @param sensor sensor emitting the detection signal
     */
    private on_detection;
    /**
     * Callback executed when the signal correspond the the lowbattery code of one of the sensor listed in the configuration
     * @param sensor sensor emitting the lowbattery signal
     */
    private on_lowbattery;
    /**
     * Callback executed when the signal does not correspond to any code of sensors listed in the configuration
     * @param code sensorcode received by the 433MHz listener
     */
    private on_unknown_code_received;
    /**
     * Cancel the debounce timer of the detection debounced callback
     */
    reset_debounce_detection(): void;
    /**
     * Cancel the debounce timer of the lowbattery debounced callback
     */
    reset_debounce_lowbattery(): void;
}
