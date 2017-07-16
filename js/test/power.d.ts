import { Switch, IMessageTransport } from '../index';
export declare class PowerSwitch extends Switch {
    lastUpdated: any;
    socket: string;
    constructor(client: IMessageTransport);
    protected _onSetState(state: any): any;
}
