"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
class DeviceGroup extends events.EventEmitter {
    constructor() {
        super(...arguments);
        this._devices = new Array();
    }
    getDevices() {
        return this._devices;
    }
    addDevice(device) {
        this._devices.push(device);
    }
    addDevices(array) {
        this._devices.concat(array);
    }
    setDevices(array) {
        this._devices = array;
    }
    removeDevice(device) {
        if (!device) {
            return;
        }
        let index = this._getDeviceIndex(device);
        this._devices.splice(index, 1);
    }
    removeDevices(array) {
        for (let dev of array) {
            this.removeDevice(dev);
        }
    }
    // A device group
    setState(state) {
        return false;
    }
    getState() {
        return this._state;
    }
    _getDeviceIndex(device) {
        for (let i = 0; i < this._devices.length; i++) {
            if (this._devices[i] == device) {
                return i;
            }
        }
        return -1;
    }
}
exports.DeviceGroup = DeviceGroup;
//# sourceMappingURL=deviceGroup.js.map