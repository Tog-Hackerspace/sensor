import { IEventEmitter } from './eventEmitter.d';

export interface IDevice extends IEventEmitter {

  getMQTT(): object;
  publish(...msgs: any[]): void;
  state: any;
}
