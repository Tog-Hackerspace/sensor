"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
const joi_1 = require("./joi");
var AccessLevel;
(function (AccessLevel) {
    AccessLevel[AccessLevel["READ_ONLY"] = 0] = "READ_ONLY";
    AccessLevel[AccessLevel["READ_WRITE"] = 1] = "READ_WRITE";
})(AccessLevel = exports.AccessLevel || (exports.AccessLevel = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["Sensor"] = 0] = "Sensor";
    DeviceType[DeviceType["Switch"] = 1] = "Switch";
})(DeviceType = exports.DeviceType || (exports.DeviceType = {}));
class DeviceChannels {
}
DeviceChannels.ACK = 'ack';
DeviceChannels.MESSAGE = 'message';
DeviceChannels.UPDATE = 'update';
exports.DeviceChannels = DeviceChannels;
class Device extends events.EventEmitter {
    constructor(type, client, _ackSchema, _subSchema, _ack = [], // acknowledgements from device
        _sub = [], // subscribe to data from device
        _pub = [], // publish topic
        serial = '', name = '', description = '', location = 'unknown', _accessLevel = AccessLevel.READ_WRITE) {
        super();
        this.type = type;
        this.client = client;
        this._ackSchema = _ackSchema;
        this._subSchema = _subSchema;
        this._ack = _ack;
        this._sub = _sub;
        this._pub = _pub;
        this.serial = serial;
        this.name = name;
        this.description = description;
        this.location = location;
        this._accessLevel = _accessLevel;
        // update this object's properties on recieving an ACK
        this._updatePropertiesFromAcks = true;
        for (let topic of _ack) {
            this.client.subscribe(topic);
        }
        for (let topic of _sub) {
            this.client.subscribe(topic);
        }
        client.on('message', (topic, message) => {
            if (message instanceof Buffer) {
                message = message.toString();
            }
            if (message instanceof String) {
                try {
                    message = JSON.parse(message.toString());
                }
                catch (err) {
                    console.log(err);
                    return;
                }
            }
            // ACK
            if (this._ack.indexOf(topic) !== -1) {
                if (this._ackSchema) {
                    joi_1.Joi.validateAsync(message, this._ackSchema)
                        .then((result) => {
                        this.emit(DeviceChannels.ACK, this, result);
                        this._onAcknowledgement(topic, result);
                    })
                        .catch((err) => {
                        // TODO: handle errors better
                        if (err.name === 'ValidationError') {
                            return;
                        }
                        console.log(err);
                    });
                }
                else {
                    this.emit(DeviceChannels.ACK, this, message);
                    this._onAcknowledgement(topic, message);
                }
            }
            // MSG
            if (this._sub.indexOf(topic) !== -1) {
                if (this._subSchema) {
                    joi_1.Joi.validateAsync(message, this._subSchema)
                        .then((result) => {
                        this.emit(DeviceChannels.MESSAGE, this, result);
                        this._onMessage(topic, result);
                    })
                        .catch((err) => {
                        // TODO: handle errors better
                        if (err.name === 'ValidationError') {
                            return;
                        }
                        console.log(err);
                    });
                }
                else {
                    this.emit(DeviceChannels.MESSAGE, this, message);
                    this._onMessage(topic, message);
                }
            }
        });
    }
    getMQTT() {
        return {
            client: this.client,
            ack: this._ack,
            subscribe: this._sub,
            publish: this._pub
        };
    }
    publish(...msgs) {
        if (this._pub) {
            for (let message of msgs) {
                if (message instanceof Object) {
                    message = JSON.stringify(message);
                }
                for (let topic of this._pub) {
                    this.client.publish(topic, message);
                }
            }
        }
    }
    // overloaded by child classes
    // use this method to optionally rename properties which are
    // assigned to this object via ack messages
    _assignAckPropertyValue(key, value) {
        this[key] = value;
        return true;
    }
    // recieved a message on an ACKs topic update object with properties in the
    // message. this behaviour is configurable with _updatePropertiesFromAcks
    // overloading by children will require calling super(topic, message) for
    // expected functionality.
    _onAcknowledgement(topic, message) {
        let delta = null;
        let updated = false;
        if (this._updatePropertiesFromAcks) {
            delta = {
                current: {},
                previous: {}
            };
            let enumerableProperties = Object.keys(this);
            for (let key of Object.keys(message)) {
                if (enumerableProperties.indexOf(key) &&
                    this[key] !== message[key]) {
                    delta.previous[key] = this[key];
                    if (this._assignAckPropertyValue(key, message[key])) {
                        delta.current[key] = this[key];
                        updated = true;
                    }
                }
            }
        }
        if (updated) {
            this.emit(DeviceChannels.UPDATE, this, delta);
        }
        return updated;
    }
    _onMessage(topic, message) {
        // overloaded by children
    }
}
exports.Device = Device;
