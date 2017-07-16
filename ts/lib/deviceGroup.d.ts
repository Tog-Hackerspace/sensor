
import { IDevice } from './device.d';

export interface IDeviceGroup {

  getDevices(): Array<IDevice>;

  addDevice(device: IDevice): void;
  addDevices(array: Array<IDevice>): void;

  setDevices(array: Array<IDevice>): void;

  removeDevice(device: IDevice): void;
  removeDevices(array: Array<IDevice>): void;

  getDevice(index: number): IDevice | null;
  setState(state: any, index: number): void;
  getState(index: number): any;

}
