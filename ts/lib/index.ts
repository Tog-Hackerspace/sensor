import events = require('events');
import { IMessageTransport } from './interfaces/transport';

import { DeviceChannels } from './device';
import { KnifeSwitch } from './switches/knife';
import { PowerSwitch } from './switches/power';

export class SensorChannels {
  public static All = 'message';

  public static KnifeSwitch = 'KnifeSwitch';
  public static PowerSwitch = 'PowerSwitch';
}

export class SensorNetwork extends events.EventEmitter {

  protected _sensors: any = {
    KnifeSwitch: null,
    PowerSwitch: null,
  };

  constructor(protected _client: IMessageTransport) {
    super();
    if(!_client) {
      throw new Error('MQTT Client is not an optional argument.');
    }
  }

  public getMQTT(): any {
    let out : any = {
      client: this._client,
    };

    for(let sensor of Object.keys(this._sensors)) {
      out[sensor] =   this._sensors[sensor] ?
                      this._sensors[sensor].getMQTT() :
                      null;
      if(out[sensor]) {
        delete out[sensor].client;
      }
    }

    return out;
  }

  public get KnifeSwitch(): KnifeSwitch {
    if(!this._sensors.KnifeSwitch) {
      this._sensors.KnifeSwitch = new KnifeSwitch(this._client);
      this._sensors.KnifeSwitch.on(DeviceChannels.MESSAGE, (data: any) => {
        this.emit(SensorChannels.All, data);
        this.emit(SensorChannels.KnifeSwitch, data);
      });
    }
    return this._sensors.KnifeSwitch;
  }

  public get PowerSwitch(): PowerSwitch {
    if(!this._sensors.PowerSwitch) {
      this._sensors.PowerSwitch = new PowerSwitch(this._client);
      this._sensors.PowerSwitch.on(DeviceChannels.MESSAGE, (data: any) => {
        this.emit(SensorChannels.All, data);
        this.emit(SensorChannels.PowerSwitch, data);
      });
    }
    return this._sensors.PowerSwitch;
  }

  /*
   *  Initialize sensors upon listening to their events.
   *  Note that this will leave 'dangling' sensors if
   *  events are unsubscribed from.
   */
  public on(event: string | symbol, listener: (...args: any[]) => void) {
    switch(event) {
      case SensorChannels.KnifeSwitch:
        this.KnifeSwitch;
        break;
      case SensorChannels.PowerSwitch:
        this.PowerSwitch;
        break;
    }
    return super.on(event, listener);
  }

}
