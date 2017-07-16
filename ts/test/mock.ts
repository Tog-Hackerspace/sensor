import { IMessageTransport, Callback } from '../lib/transport';

export class MockTransport implements IMessageTransport {

  subscribe(topic: string, callback?: Callback): any {
    console.log('>', 'subscribe', topic);
  }

  on(topic: string, callback?: Callback): any {
    console.log('>', 'on', topic);
  }

  publish(topic: string, message: string, callback?: Callback): any {
    console.log('>', 'publish', topic, message);
  }

}
