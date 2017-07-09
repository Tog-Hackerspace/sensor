import * as JOI from 'joi-browser';
import * as bluebird from 'bluebird';

export const Joi:any = bluebird.promisifyAll(JOI);
