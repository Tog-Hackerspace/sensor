import { AccessLevel, Switch } from './switch';
import { Client } from 'mqtt';
import { Joi } from '../joi';
import { AckSchema, SubSchema } from './knife.schema'

export class KnifeSwitch extends Switch {
  public sensorPin = -1;

  constructor(client: Client) {
    super(
      client,
      AckSchema,
      SubSchema,
      ['/tog/sensors/rf/common_room/acks'],   // ACKs
      ['/tog/sensors/rf/common_room'],        // CMD
      ['/tog/sensors/rf/common_room'],        // PUB
      'knife_switch_ca750200',
      'Knife Switch',
      'Open / Closed status switch (shown on website)',
      'common_room',
      AccessLevel.READ_ONLY
    );
  }
}
