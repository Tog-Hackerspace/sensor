"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("../joi");
exports.AckSchema = joi_1.Joi.object().keys({
    sensor_pin: joi_1.Joi.number()
        .min(0)
        .max(255)
        .required()
        .label('sensorPin'),
    value: joi_1.Joi.bool()
        .required()
        .label('state'),
    client_id: joi_1.Joi.string()
        .required()
        .allow('knife_switch_ca750200')
        .label('serial'),
    sensor_name: joi_1.Joi.string()
        .required()
        .label('name')
})
    .rename('sensor_pin', 'sensorPin')
    .rename('value', 'state')
    .rename('client_id', 'serial')
    .rename('sensor_name', 'name');
exports.SubSchema = null;
