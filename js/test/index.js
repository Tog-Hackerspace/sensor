"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_1 = require("./mock");
const power_1 = require("./power");
// import * as mqtt from 'mqtt';
// let host = 'localhost';
// let client = mqtt.connect('mqtt://' + host);
let client = new mock_1.MockTransport();
let power = new power_1.PowerSwitch(client);
power.on('ack', (powerSwitch, ack) => {
    console.log('ACK: ', ack);
});
power.on('message', (powerSwitch, msg) => {
    console.log('Message: ', msg);
});
power.on('update', (powerSwitch, delta) => {
    console.log('Update: ', delta);
});
setInterval(() => {
    power.state = !power.state;
    console.log('state', power.state);
}, 1500);
//# sourceMappingURL=index.js.map