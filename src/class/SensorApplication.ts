import Receiver from "433-utils/src/Receiver";
import { SensorCode } from "./SensorCode";
import { SensorDetectionHistory } from "./SensorDetectionHistory";

/**
 * Class of the main application offering management of IRSensors received codes.
 *
 * @export
 * @class SensorApplication
 */
export class SensorApplication {
    receiver: Receiver;
    history: SensorDetectionHistory;

    constructor(pin: number, callback: Function) {
        this.receiver = new Receiver(pin);
        console.log("Now listening on PIN " + pin);
        this.history = new SensorDetectionHistory();
        this.history.reset_all_history();
        this.set_listener_callback(callback);
    }
    set_listener_callback(callback: Function) {
        this.receiver.setOnReceiveListener((data) => {
            console.debug("Listener received code : " + data);
            let code: SensorCode = data;
            callback(code);
        });
        console.debug("Callback set.");
    }
}
