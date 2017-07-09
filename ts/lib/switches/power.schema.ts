
import { Joi } from '../joi';

export const AckSchema = Joi.object().keys({
  state:        Joi .bool()
                    .required(),

  lastUpdated:  Joi .string()
                    .isoDate()
                    .required(),

  socket:       Joi .string()
                    .required(),
})
.rename('when', 'lastUpdated')

export const SubSchema = null;
