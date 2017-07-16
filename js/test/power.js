"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const power_schema_1 = require("./power.schema");
class PowerSwitch extends index_1.Switch {
    constructor(client) {
        super(client, power_schema_1.PowerSwitchSchema.ack, power_schema_1.PowerSwitchSchema.sub, ['/tog/sensors/rf/common_room/acks'], // ACK
        ['/tog/sensors/rf/common_room'], // MSG
        ['/tog/sensors/rf/common_room'], // PUB
        'no_serial', 'Power Switch', 'Power switches attached to the lamps in the common room', 'common_room', index_1.AccessLevel.READ_WRITE);
        this.lastUpdated = null;
        this.socket = 'all';
    }
    _onSetState(state) {
        super.publish({
            state: state,
            socket: this.socket
        });
        return true;
    }
}
exports.PowerSwitch = PowerSwitch;
//# sourceMappingURL=power.js.map