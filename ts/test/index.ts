import * as mqtt from 'mqtt';
import { SensorNetwork } from '../';

let host = 'localhost';
let client = mqtt.connect('mqtt://' + host);

/*
client.subscribe('/tog/#');

client.on('message', (topic, msg) => {
  console.log(topic, msg.toString());
})
*/

let sensorNet = new SensorNetwork(client);

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
