import { Device } from './device';
export declare enum SensorType {
    Temperature = 0,
    Humidity = 1,
    Luminosity = 2,
    Loudness = 3,
    Motion = 4,
    AirQuality = 5,
}
export declare abstract class Sensor extends Device {
    kind: SensorType;
}
