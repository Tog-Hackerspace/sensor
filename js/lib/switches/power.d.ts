import { Switch } from './switch';
import { Client } from 'mqtt';
export declare class PowerSwitch extends Switch {
    lastUpdated: any;
    socket: string;
    constructor(client: Client);
    protected _onSetState(state: boolean): any;
}
