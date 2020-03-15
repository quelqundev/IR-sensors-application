import Receiver from "433-utils/src/Receiver";
import { SensorCode } from "./SensorCode";

/**
 * Class of the main application offering management of IRSensors received codes.
 *
 * @export
 * @class SensorApplication
 */
export class SensorApplication {
    receiver: Receiver;
    constructor(pin: number, callback: Function) {
        this.receiver = new Receiver(pin);
        console.log("Now listening on PIN " + pin);
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
