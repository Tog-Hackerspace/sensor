"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const switch_1 = require("./switch");
const knife_schema_1 = require("./knife.schema");
class KnifeSwitch extends switch_1.Switch {
    constructor(client) {
        super(client, knife_schema_1.AckSchema, knife_schema_1.SubSchema, ['/tog/sensors/rf/common_room/acks'], // ACKs
        ['/tog/sensors/rf/common_room'], // CMD
        ['/tog/sensors/rf/common_room'], // PUB
        'knife_switch_ca750200', 'Knife Switch', 'Open / Closed status switch (shown on website)', 'common_room', switch_1.AccessLevel.READ_ONLY);
        this.sensorPin = -1;
    }
}
exports.KnifeSwitch = KnifeSwitch;
