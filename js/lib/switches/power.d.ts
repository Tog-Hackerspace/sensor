import { Switch } from './switch';
import { IMessageTransport } from '../interfaces/transport';
export declare class PowerSwitch extends Switch {
    lastUpdated: any;
    socket: string;
    constructor(client: IMessageTransport);
    protected _onSetState(state: boolean): any;
}
