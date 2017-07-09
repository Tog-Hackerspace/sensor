
import { Joi } from '../joi';

export const AckSchema = Joi.object().keys({
  sensor_pin:   Joi .number()
                    .min(0)
                    .max(255)
                    .required()
                    .label('sensorPin'),

  value:        Joi .bool()
                    .required()
                    .label('state'),

  client_id:    Joi .string()
                    .required()
                    .allow('knife_switch_ca750200')
                    .label('serial'),

  sensor_name:  Joi .string()
                    .required()
                    .label('name')
})
.rename('sensor_pin', 'sensorPin')
.rename('value', 'state')
.rename('client_id', 'serial')
.rename('sensor_name', 'name')

export const SubSchema = null;
