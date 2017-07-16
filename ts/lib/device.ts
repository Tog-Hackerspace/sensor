import events = require('events');

import { Joi } from './joi';
import { IDevice } from './device.d';
import { IMessageTransport } from './transport.d';

export enum AccessLevel {
  READ_ONLY,
  READ_WRITE
}

export enum DeviceType {
  Sensor,
  Switch
}

export class DeviceChannels {
  public static ACK: string = 'ack';
  public static MESSAGE: string = 'message';
  public static UPDATE: string = 'update';
}

export abstract class Device extends events.EventEmitter implements IDevice {

  protected _state: any = null;

  // update this object's properties on recieving an ACK
  protected _updatePropertiesFromAcks: boolean = true;

  constructor(public type: DeviceType | Object,
              public client: IMessageTransport,
              protected _ackSchema: any,
              protected _subSchema: any,
              protected _ack: string[] = [], // acknowledgements from device
              protected _sub: string[] = [],  // subscribe to data from device
              protected _pub: string[] = [],  // publish topic
              public serial: string = '',
              public name: string = '',
              public description: string = '',
              public location: string = 'unknown',
              protected _accessLevel: AccessLevel = AccessLevel.READ_WRITE) {
    super();

    for(let topic of _ack) {
      this.client.subscribe(topic);
    }

    for(let topic of _sub) {
      this.client.subscribe(topic);
    }

    client.on('message', (topic: string, message: any) => {
      if(message instanceof Buffer) { message = message.toString(); }
      if(message instanceof String) {
        try {
          message = JSON.parse(message.toString());
        } catch(err) {
          console.log(err);
          return;
        }
      }

      // ACK
      if(this._ack.indexOf(topic) !== -1) {
        if(this._ackSchema) {
          Joi .validateAsync(message, this._ackSchema)
              .then((result: any) => {
            this.emit(DeviceChannels.ACK, this, result);
            this._onAcknowledgement(topic, result);
          })
          .catch((err: any) => {
            // TODO: handle errors better
            if(err.name === 'ValidationError') { return; }
            console.log(err);
          });
        } else {
          this.emit(DeviceChannels.ACK, this, message);
          this._onAcknowledgement(topic, message);
        }
      }

      // MSG
      if(this._sub.indexOf(topic) !== -1) {
        if(this._subSchema) {
          Joi .validateAsync(message, this._subSchema)
              .then((result: any) => {
            this.emit(DeviceChannels.MESSAGE, this, result);
            this._onMessage(topic, result);
          })
          .catch((err: any) => {
            // TODO: handle errors better
            if(err.name === 'ValidationError') { return; }
            console.log(err);
          });
        } else {
          this.emit(DeviceChannels.MESSAGE, this, message);
          this._onMessage(topic, message);
        }
      }
    });
  }

  public getMQTT(): object {
    return {
      client: this.client,
      ack: this._ack,
      subscribe: this._sub,
      publish: this._pub
    }
  }

  protected publish(...msgs: any[]) {
    if(this._pub) {
      for(let message of msgs) {
        if(message instanceof Object) {
          message = JSON.stringify(message);
        }
        for(let topic of this._pub) {
          this.client.publish(topic, message);
        }
      }
    }
  }

  // overloaded by child classes
  // use this method to optionally rename properties which are
  // assigned to this object via ack messages
  protected _assignAckPropertyValue(key: string, value: any) {
    (this as any)[key] = value
    return true;
  }

  // recieved a message on an ACKs topic update object with properties in the
  // message. this behaviour is configurable with _updatePropertiesFromAcks
  // overloading by children will require calling super(topic, message) for
  // expected functionality.
  protected _onAcknowledgement(topic: string, message: any) {
    let delta : any = null;
    let updated = false;
    if(this._updatePropertiesFromAcks) {
      delta = {
        current: {},
        previous: {}
      };
      let enumerableProperties = Object.keys(this);
      for(let key of Object.keys(message)) {
        if( enumerableProperties.indexOf(key) &&
            (this as any)[key] !== message[key]) {
          delta.previous[key] = (this as any)[key];
          if(this._assignAckPropertyValue(key, message[key])) {
            delta.current[key] = (this as any)[key];
            updated = true;
          }
        }
      }
    }
    if(updated) {
      this.emit(DeviceChannels.UPDATE, this, delta);
    }
    return updated;
  }

  protected _onMessage(topic: string, message: Object) {
    // overloaded by children
  }

  public get state() {
    return this._state;
  }

  public set state(state: any) {
    if(this._onSetState(state)) {
      return;
    }
    if(this._accessLevel != AccessLevel.READ_WRITE) { return; }
    // don't set the state here
    // wait for the ACK response
    // TODO: make this behaviour optional
    this.publish(this._onSetState(state));
  }

  // return true to interrupt default setState behaviour
  protected _onSetState(state: any): boolean {
    // implemented by children
    return false;
  }
}
