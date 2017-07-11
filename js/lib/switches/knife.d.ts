import { Switch } from './switch';
import { Client } from 'mqtt';
export declare class KnifeSwitch extends Switch {
    sensorPin: number;
    constructor(client: Client);
}
