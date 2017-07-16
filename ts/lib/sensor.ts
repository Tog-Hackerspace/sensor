import { Device } from './device';

export enum SensorType {
  Temperature,
  Humidity,
  Luminosity,
  Loudness,
  Motion,
  AirQuality
}

export abstract class Sensor extends Device {
    public kind: SensorType;
}
