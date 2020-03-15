import { IRSensor } from "../src/class/IRSensor";
import { SensorConfig } from "../src/class/SensorConfig";

test('load config file', function () {
    let IRSensor_list: SensorConfig= [];
    IRSensor_list = SensorConfig.get_sensors_list_from_configuration();
    expect(IRSensor_list[0].name).toBe("sensor1");
    expect(IRSensor_list[1].name).toBe("sensor2");
});