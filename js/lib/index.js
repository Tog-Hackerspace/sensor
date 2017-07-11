"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
const device_1 = require("./device");
const knife_1 = require("./switches/knife");
const power_1 = require("./switches/power");
class SensorChannels {
}
SensorChannels.All = 'message';
SensorChannels.KnifeSwitch = 'KnifeSwitch';
SensorChannels.PowerSwitch = 'PowerSwitch';
exports.SensorChannels = SensorChannels;
class SensorNetwork extends events.EventEmitter {
    constructor(_client) {
        super();
        this._client = _client;
        this._sensors = {
            KnifeSwitch: null,
            PowerSwitch: null,
        };
        if (!_client) {
            throw new Error('MQTT Client is not an optional argument.');
        }
    }
    getMQTT() {
        let out = {
            client: this._client,
        };
        for (let sensor of Object.keys(this._sensors)) {
            out[sensor] = this._sensors[sensor] ?
                this._sensors[sensor].getMQTT() :
                null;
            if (out[sensor]) {
                delete out[sensor].client;
            }
        }
        return out;
    }
    get KnifeSwitch() {
        if (!this._sensors.KnifeSwitch) {
            this._sensors.KnifeSwitch = new knife_1.KnifeSwitch(this._client);
            this._sensors.KnifeSwitch.on(device_1.DeviceChannels.MESSAGE, (data) => {
                this.emit(SensorChannels.All, data);
                this.emit(SensorChannels.KnifeSwitch, data);
            });
        }
        return this._sensors.KnifeSwitch;
    }
    get PowerSwitch() {
        if (!this._sensors.PowerSwitch) {
            this._sensors.PowerSwitch = new power_1.PowerSwitch(this._client);
            this._sensors.PowerSwitch.on(device_1.DeviceChannels.MESSAGE, (data) => {
                this.emit(SensorChannels.All, data);
                this.emit(SensorChannels.PowerSwitch, data);
            });
        }
        return this._sensors.PowerSwitch;
    }
    /*
     *  Initialize sensors upon listening to their events.
     *  Note that this will leave 'dangling' sensors if
     *  events are unsubscribed from.
     */
    on(event, listener) {
        switch (event) {
            case SensorChannels.KnifeSwitch:
                this.KnifeSwitch;
                break;
            case SensorChannels.PowerSwitch:
                this.PowerSwitch;
                break;
        }
        return super.on(event, listener);
    }
}
exports.SensorNetwork = SensorNetwork;
//# sourceMappingURL=index.js.map