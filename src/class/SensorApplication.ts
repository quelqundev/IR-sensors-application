import {Receiver} from "433-utils";
import { SensorCode } from "./SensorCode";
import { SensorDetectionHistory } from "./SensorDetectionHistory";
import { SensorLowBatteryHistory } from "./SensorLowBatteryHistory";
import { SensorConfig } from "./SensorConfig";
import { IRSensor } from "./IRSensor";
import _ from "lodash";


/**
 * Class of the main application offering management of IRSensors received codes.
 *
 * @export
 * @class SensorApplication
 */
export class SensorApplication {
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
    notify_users_detection_debounced_callback: (sensorapplication: SensorApplication) => void;
    /**
     * Callback executed when low battery signal is received
     */
    notify_users_lowbattery_debounced_callback: (sensorapplication: SensorApplication) => void;
    /**
     * Callback executed on reception of unknown code
     */
    unknowncode_received_callback: (code: SensorCode) => void;

    constructor(
        pin: number,
        config: SensorConfig,
        notify_users_detection_callback: (sensorapplication: SensorApplication) => void,
        notify_detection_debounceduration_ms: number,
        notify_users_lowbattery_callback: (sensorapplication: SensorApplication) => void,
        notify_lowbattery_debounceduration_ms: number,
        unknowncode_received_callback:(code: SensorCode) => void
    ) {
        this.receiver = new Receiver(pin);
        console.log("Now listening on PIN " + pin);
        this.config = config;
        console.log(config);
        this.detection_history = new SensorDetectionHistory();
        this.detection_history.reset_all_history();
        this.lowbattery_history = new SensorLowBatteryHistory();
        this.lowbattery_history.reset_all_history();
        this.receiver.setOnReceiveListener((data: any) => {
            console.debug("Listener received code : " + data);
            let code: SensorCode = data;
            this.on_received_code(code);
        });
        this.notify_users_detection_debounced_callback = _.debounce(notify_users_detection_callback, notify_detection_debounceduration_ms, { leading: true, trailing:false });
        this.notify_users_lowbattery_debounced_callback = _.debounce(notify_users_lowbattery_callback, notify_lowbattery_debounceduration_ms, { leading: true, trailing:false });
        this.unknowncode_received_callback = unknowncode_received_callback;
    }

    on_received_code(code: SensorCode) {
        //search config list
        let corresponding_sensor = this.config.find_sensor_in_config_from_sensorcode(code);
        if (undefined != corresponding_sensor) {
            //if this code is corresponding to one of our sensors configuration
            //low_battery or detection ?
            if (code == corresponding_sensor.detection_code) {
                this.on_detection(corresponding_sensor);
            }
            else if (code == corresponding_sensor.lowbattery_code) {
                this.on_lowbattery(corresponding_sensor);
            }
            else {
                //TODO remonter erreur
                console.error();
            }
        }
        else {
            //this code is unknown
            this.on_unknown_code_received(code);
        }
    }

    on_detection(sensor: IRSensor) {
        console.log("Detection signal of sensor : " + sensor.name);
        this.detection_history.increment_history(sensor);
        this.notify_users_detection_debounced_callback(this);
    }
    on_lowbattery(sensor: IRSensor) {
        console.log("Low Battery signal of sensor : " + sensor.name);
        this.lowbattery_history.increment_history(sensor);
        this.notify_users_lowbattery_debounced_callback(this);
    }
    on_unknown_code_received(code: SensorCode) {
        console.log("Unknown signal : " + code);
        //TODO fonction de signalisation d'activité sans debounce car on veut tous les codes ?
        this.unknowncode_received_callback(code);
    }

}
