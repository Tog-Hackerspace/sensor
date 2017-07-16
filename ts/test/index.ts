import { MockTransport } from './mock';
import { PowerSwitch } from './power';

//let host = 'localhost';
//let client = mqtt.connect('mqtt://' + host);

let client = new MockTransport();

let power = new PowerSwitch(client);

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
