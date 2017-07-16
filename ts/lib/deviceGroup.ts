import events = require('events');
import { IDevice } from './device.d';
import { IDeviceGroup } from './deviceGroup.d';

export abstract class DeviceGroup extends events.EventEmitter implements IDeviceGroup {

  protected _state: any;
  protected _devices: Array<IDevice> = new Array<IDevice>();

  getDevices(): Array<IDevice> {
    return this._devices;
  }

  addDevice(device: IDevice): void {
    this._devices.push(device);
  }
  addDevices(array: Array<IDevice>): void {
    this._devices.concat(array);
  }

  setDevices(array: Array<IDevice>): void {
    this._devices = array;
  }

  removeDevice(device: IDevice): void {
    if(!device) {
      return;
    }
    let index = this._getDeviceIndex(device);
    this._devices.splice(index, 1);
  }
  removeDevices(array: Array<IDevice>): void {
    for(let dev of array) {
      this.removeDevice(dev);
    }
  }

  // A device group
  setState(state: any): boolean {
    return false;
  }
  getState(): any {
    return this._state;
  }

  protected _getDeviceIndex(device: IDevice): number {
    for(let i=0; i<this._devices.length; i++) {
      if(this._devices[i] == device) {
        return i;
      }
    }
    return -1;
  }
}
