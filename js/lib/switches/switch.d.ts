import { Client } from 'mqtt';
import { Device } from '../device';
import { AccessLevel } from '../device';
export { AccessLevel, DeviceChannels } from '../device';
export declare abstract class Switch extends Device {
    client: Client;
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
    protected _state: boolean;
    constructor(client: Client, _ackSchema: any, _subSchema: any, _ack?: string[], _sub?: string[], _pub?: string[], serial?: string, name?: string, description?: string, location?: string, _accessLevel?: AccessLevel);
    state: boolean;
    protected _onSetState(state: boolean): any;
    protected _assignAckPropertyValue(key: string, value: any): boolean;
}
