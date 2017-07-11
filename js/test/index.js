"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
const mock_1 = require("./mock");
//let host = 'localhost';
//let client = mqtt.connect('mqtt://' + host);
let client = new mock_1.MockTransport();
let sensorNet = new _1.SensorNetwork(client);
console.log('Disco power switches!');
sensorNet.PowerSwitch.on('ack', (powerSwitch, ack) => {
    console.log('ACK: ', ack);
});
sensorNet.PowerSwitch.on('message', (powerSwitch, msg) => {
    console.log('Message: ', msg);
});
sensorNet.PowerSwitch.on('update', (powerSwitch, delta) => {
    console.log('Update: ', delta);
});
setInterval(() => {
    sensorNet.PowerSwitch.state = !sensorNet.PowerSwitch.state;
    console.log('state', sensorNet.PowerSwitch.state);
}, 1500);
//# sourceMappingURL=index.js.map