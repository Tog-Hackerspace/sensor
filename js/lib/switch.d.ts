import { IMessageTransport } from './transport.d';
import { Device, AccessLevel } from './device';
export { AccessLevel, DeviceChannels } from './device';
export declare abstract class Switch extends Device {
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
    constructor(client: IMessageTransport, _ackSchema: any, _subSchema: any, _ack?: string[], _sub?: string[], _pub?: string[], serial?: string, name?: string, description?: string, location?: string, _accessLevel?: AccessLevel);
    protected _assignAckPropertyValue(key: string, value: any): boolean;
}
