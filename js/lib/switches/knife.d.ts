import { Switch } from './switch';
import { IMessageTransport } from '../interfaces/transport';
export declare class KnifeSwitch extends Switch {
    sensorPin: number;
    constructor(client: IMessageTransport);
}
