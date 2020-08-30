import { TimeslotInterval } from './timeslot-interval.type';
export interface Timeslot {
  interval: [TimeslotInterval];
  recclosuredays: string;
}
