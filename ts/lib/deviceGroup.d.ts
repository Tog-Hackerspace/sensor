
import { IDevice } from './device.d';

export interface IDeviceGroup {

  getDevices(): Array<IDevice>;

  addDevice(device: IDevice): void;
  addDevices(array: Array<IDevice>): void;

  setDevices(array: Array<IDevice>): void;

  removeDevice(device: IDevice): void;
  removeDevices(array: Array<IDevice>): void;

  setState(state: any): boolean;
  getState(): any;

}
