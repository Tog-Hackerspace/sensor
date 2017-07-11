"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = require("../device");
var SensorType;
(function (SensorType) {
    SensorType[SensorType["Temperature"] = 0] = "Temperature";
    SensorType[SensorType["Humidity"] = 1] = "Humidity";
    SensorType[SensorType["Luminosity"] = 2] = "Luminosity";
    SensorType[SensorType["Loudness"] = 3] = "Loudness";
    SensorType[SensorType["Motion"] = 4] = "Motion";
    SensorType[SensorType["AirQuality"] = 5] = "AirQuality";
})(SensorType = exports.SensorType || (exports.SensorType = {}));
class Sensor extends device_1.Device {
}
exports.Sensor = Sensor;
//# sourceMappingURL=sensor.js.map