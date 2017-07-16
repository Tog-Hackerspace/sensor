import {
  AccessLevel,
  Switch,
  IMessageTransport
} from '../index';
import { Joi } from '../lib/joi';
import { PowerSwitchSchema } from './power.schema'

export class PowerSwitch extends Switch {

  public lastUpdated: any = null;
  public socket: string = 'all';

  constructor(client: IMessageTransport) {
    super(
      client,
      PowerSwitchSchema.ack,
      PowerSwitchSchema.sub,
      ['/tog/sensors/rf/common_room/acks'],   // ACK
      ['/tog/sensors/rf/common_room'],        // MSG
      ['/tog/sensors/rf/common_room'],        // PUB
      'no_serial',
      'Power Switch',
      'Power switches attached to the lamps in the common room',
      'common_room',
      AccessLevel.READ_WRITE
    );
  }

  protected _onSetState(state: boolean): any {

    this.publish({
      state: state,
      socket: this.socket
    });

    return true;
  }
}
