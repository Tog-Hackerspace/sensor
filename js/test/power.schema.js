"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("../lib/joi");
const AckSchema = joi_1.Joi.object().keys({
    state: joi_1.Joi.bool()
        .required(),
    lastUpdated: joi_1.Joi.string()
        .isoDate()
        .required(),
    socket: joi_1.Joi.string()
        .required(),
})
    .rename('when', 'lastUpdated');
const SubSchema = null;
exports.PowerSwitchSchema = {
    ack: AckSchema,
    sub: SubSchema
};
//# sourceMappingURL=power.schema.js.map