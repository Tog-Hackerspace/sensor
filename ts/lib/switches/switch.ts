import { Client } from 'mqtt';
import { Device } from '../device';
import { DeviceType, AccessLevel, DeviceChannels } from '../device';
export { AccessLevel, DeviceChannels } from '../device';

export abstract class Switch extends Device {

    protected _state: boolean = false;

    constructor(public client: Client,
                protected _ackSchema: any,
                protected _subSchema: any,
                protected _ack: string[] = [], // acknowledgements from device
                protected _sub: string[] = [],  // subscribe to data from device
                protected _pub: string[] = [],  // publish topic
                public serial: string = '',
                public name: string = '',
                public description: string = '',
                public location: string = 'unknown',
                protected _accessLevel: AccessLevel = AccessLevel.READ_WRITE) {

      super(  DeviceType.Switch,
              client,
              _ackSchema,
              _subSchema,
              _ack,
              _sub,
              _pub,
              serial,
              name,
              description,
              location,
              _accessLevel);
    }

    public get state() {
      return this._state;
    }

    public set state(state: boolean) {
      if(this._accessLevel != AccessLevel.READ_WRITE) { return; }
      // don't set the state here
      // wait for the ACK response
      // TODO: make this behaviour optional
      this.publish(this._onSetState(state));
    }

    protected _onSetState(state: boolean): any {
      return null;
    }

    // manually assign the state variable
    // as it is a setter, doing so automagically would
    // be cyclical.
    protected _assignAckPropertyValue(key: string, value: any) {
      if(key === 'state') {
        this._state = value;
        return true;
      }
      return super._assignAckPropertyValue(key, value);
    }
}
