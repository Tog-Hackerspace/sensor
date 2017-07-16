export interface Callback {
    (err: any, result: any): void;
}

export interface IMessageTransport {

  subscribe(topic: string, callback?: Callback): any;

  on(topic: string, callback?: Callback): any;

  publish(topic: string, message: string, callback?: Callback): any;
}
