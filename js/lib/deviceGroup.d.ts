/// <reference types="node" />
import events = require('events');
import { IDevice } from './device.d';
import { IDeviceGroup } from './deviceGroup.d';
export declare abstract class DeviceGroup extends events.EventEmitter implements IDeviceGroup {
    protected _devices: Array<IDevice>;
    constructor(...devices: Array<IDevice>);
    getDevices(): Array<IDevice>;
    addDevice(device: IDevice): void;
    addDevices(array: Array<IDevice>): void;
    setDevices(array: Array<IDevice>): void;
    removeDevice(device: IDevice): void;
    removeDevices(array: Array<IDevice>): void;
    getDevice(index: number): IDevice | null;
    setState(state: any, index: number): void;
    getState(index: number): any;
    protected _getDeviceIndex(device: IDevice): number;
    protected _getDeviceForIndex(index: number): IDevice | null;
}
