"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("../joi");
exports.AckSchema = joi_1.Joi.object().keys({
    state: joi_1.Joi.bool()
        .required(),
    lastUpdated: joi_1.Joi.string()
        .isoDate()
        .required(),
    socket: joi_1.Joi.string()
        .required(),
})
    .rename('when', 'lastUpdated');
exports.SubSchema = null;
