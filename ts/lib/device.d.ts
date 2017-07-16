import events = require('events');

export interface IDevice extends events.EventEmitter {

  getMQTT(): object;
  publish(...msgs: any[]): void;
  state: any;
}
