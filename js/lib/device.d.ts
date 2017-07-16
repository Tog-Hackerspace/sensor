/// <reference types="node" />
import events = require('events');
import { IDevice } from './device.d';
import { IMessageTransport } from './transport.d';
export declare enum AccessLevel {
    READ_ONLY = 0,
    READ_WRITE = 1,
}
export declare enum DeviceType {
    Sensor = 0,
    Switch = 1,
}
export declare class DeviceChannels {
    static ACK: string;
    static MESSAGE: string;
    static UPDATE: string;
}
export declare abstract class Device extends events.EventEmitter implements IDevice {
    type: DeviceType | Object;
    client: IMessageTransport;
    protected _ackSchema: any;
    protected _subSchema: any;
    protected _ack: string[];
    protected _sub: string[];
    protected _pub: string[];
    serial: string;
    name: string;
    description: string;
    location: string;
    protected _accessLevel: AccessLevel;
    protected _state: any;
    protected _updatePropertiesFromAcks: boolean;
    constructor(type: DeviceType | Object, client: IMessageTransport, _ackSchema: any, _subSchema: any, _ack?: string[], _sub?: string[], _pub?: string[], serial?: string, name?: string, description?: string, location?: string, _accessLevel?: AccessLevel);
    getMQTT(): object;
    publish(...msgs: any[]): void;
    protected _assignAckPropertyValue(key: string, value: any): boolean;
    protected _onAcknowledgement(topic: string, message: any): boolean;
    protected _onMessage(topic: string, message: Object): void;
    state: any;
    protected _onSetState(state: any): boolean;
}
