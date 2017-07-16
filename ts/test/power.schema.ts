
import { Joi } from '../lib/joi';

const AckSchema = Joi.object().keys({
  state:        Joi .bool()
                    .required(),

  lastUpdated:  Joi .string()
                    .isoDate()
                    .required(),

  socket:       Joi .string()
                    .required(),
})
.rename('when', 'lastUpdated')

const SubSchema = null;

export const PowerSwitchSchema = {
  ack: AckSchema,
  sub: SubSchema
};
