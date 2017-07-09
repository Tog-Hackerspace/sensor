import * as mqtt from 'mqtt';
import { SensorNetwork } from '../';

let host = 'localhost';
let client = mqtt.connect('mqtt://' + host);

let sensorNet = new SensorNetwork(client);

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
}, 1500);
