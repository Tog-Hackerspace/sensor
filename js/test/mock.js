"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockTransport {
    subscribe(topic, callback) {
        console.log('>', 'subscribe', topic);
    }
    on(topic, callback) {
        console.log('>', 'on', topic);
    }
    publish(topic, message, callback) {
        console.log('>', 'publish', topic, message);
    }
}
exports.MockTransport = MockTransport;
//# sourceMappingURL=mock.js.map