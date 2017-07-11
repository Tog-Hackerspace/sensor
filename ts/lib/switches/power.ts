import { AccessLevel, Switch } from './switch';
import { IMessageTransport } from '../interfaces/transport';
import { Joi } from '../joi';
import { AckSchema, SubSchema } from './power.schema'

export class PowerSwitch extends Switch {

  public lastUpdated: any = null;
  public socket: string = 'all';

  constructor(client: IMessageTransport) {
    super(
      client,
      AckSchema,
      SubSchema,
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
    return {
      state: state,
      socket: this.socket
    };
  }
}
