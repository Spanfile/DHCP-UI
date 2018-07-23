import * as moment from "moment";

export default interface ILease {
  address: number;
  hardware: number;
  ends: moment.Moment;
  hostname: string;
}
