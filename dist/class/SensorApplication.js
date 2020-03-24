"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _433_utils_1 = require("433-utils");
const SensorDetectionHistory_1 = require("./SensorDetectionHistory");
const SensorLowBatteryHistory_1 = require("./SensorLowBatteryHistory");
const lodash_1 = __importDefault(require("lodash"));
/**
 * Class of the main application offering management of IRSensors received codes.
 *
 * @export
 * @class SensorApplication
 */
class SensorApplication {
    constructor(pin, config, notify_users_detection_callback, notify_detection_debounceduration_ms, notify_users_lowbattery_callback, notify_lowbattery_debounceduration_ms, unknowncode_received_callback) {
        this.receiver = new _433_utils_1.Receiver(pin);
        console.log("Now listening on PIN " + pin);
        this.config = config;
        console.log(config);
        this.detection_history = new SensorDetectionHistory_1.SensorDetectionHistory();
        this.detection_history.reset_all_history();
        this.lowbattery_history = new SensorLowBatteryHistory_1.SensorLowBatteryHistory();
        this.lowbattery_history.reset_all_history();
        this.receiver.setOnReceiveListener((data) => {
            console.debug("Listener received code : " + data);
            let code = data;
            this.on_received_code(code);
        });
        this.notify_users_detection_debounced_callback = lodash_1.default.debounce(notify_users_detection_callback, notify_detection_debounceduration_ms, { leading: true, trailing: false });
        this.notify_users_lowbattery_debounced_callback = lodash_1.default.debounce(notify_users_lowbattery_callback, notify_lowbattery_debounceduration_ms, { leading: true, trailing: false });
        this.unknowncode_received_callback = unknowncode_received_callback;
    }
    on_received_code(code) {
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
    on_detection(sensor) {
        console.log("Detection signal of sensor : " + sensor.name);
        this.detection_history.increment_history(sensor);
        this.notify_users_detection_debounced_callback(this);
    }
    on_lowbattery(sensor) {
        console.log("Low Battery signal of sensor : " + sensor.name);
        this.lowbattery_history.increment_history(sensor);
        this.notify_users_lowbattery_debounced_callback(this);
    }
    on_unknown_code_received(code) {
        console.log("Unknown signal : " + code);
        //TODO fonction de signalisation d'activité sans debounce car on veut tous les codes ?
        this.unknowncode_received_callback(code);
    }
}
exports.SensorApplication = SensorApplication;
