/// <reference types="node" />
import events = require('events');
import { IMessageTransport } from './interfaces/transport';
import { KnifeSwitch } from './switches/knife';
import { PowerSwitch } from './switches/power';
export declare class SensorChannels {
    static All: string;
    static KnifeSwitch: string;
    static PowerSwitch: string;
}
export declare class SensorNetwork extends events.EventEmitter {
    protected _client: IMessageTransport;
    protected _sensors: any;
    constructor(_client: IMessageTransport);
    getMQTT(): any;
    readonly KnifeSwitch: KnifeSwitch;
    readonly PowerSwitch: PowerSwitch;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
}
