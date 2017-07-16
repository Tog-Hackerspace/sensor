import { IMessageTransport } from './transport.d';

import {
  Device,
  DeviceType,
  AccessLevel,
  DeviceChannels
} from './device';

export {
  AccessLevel,
  DeviceChannels
} from './device';

export abstract class Switch extends Device {

    constructor(public client: IMessageTransport,
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
