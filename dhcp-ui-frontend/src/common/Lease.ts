import * as moment from "moment";
import IData from "./IData";

export interface ITransmittedLease {
  address: number;
  hardware: number;
  ends: string;
  hostname: string;
}

export default class Lease implements IData {
  public key: string;
  public address: string;
  public hardware: string;
  public ends: string;
  public hostname: string;

  constructor(source: ITransmittedLease) {
    this.address = this.toDotted(source.address);
    this.hardware = this.toMac(source.hardware.toString(16));
    this.ends = moment(source.ends).format("DD/MM/YYYY HH:mm:ss");
    this.hostname = source.hostname;

    this.key = this.address;
  }

  private toDotted(ipNum: number): string {
    return [...Array(4).keys()].map(i => (ipNum >> (i * 8)) & 255).reverse().join(".");
  }

  private toMac(hex: string): string {
    hex = this.pad(hex, 12);
    for (let i = 2; i <= 14; i += 3) {
      hex = hex.substr(0, i) + ":" + hex.substr(i);
    }
    return hex;
  }

  private pad(str: string, size: number): string {
    while (str.length < size) {
      str = "0" + str;
    }
    return str;
  }
}
