/// <reference types="node" />
import events = require('events');
import { IDevice } from './device.d';
import { IDeviceGroup } from './deviceGroup.d';
export declare abstract class DeviceGroup extends events.EventEmitter implements IDeviceGroup {
    protected _state: any;
    protected _devices: Array<IDevice>;
    getDevices(): Array<IDevice>;
    addDevice(device: IDevice): void;
    addDevices(array: Array<IDevice>): void;
    setDevices(array: Array<IDevice>): void;
    removeDevice(device: IDevice): void;
    removeDevices(array: Array<IDevice>): void;
    setState(state: any): boolean;
    getState(): any;
    protected _getDeviceIndex(device: IDevice): number;
}
