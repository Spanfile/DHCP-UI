import { IOptionsConfig } from "common/config/IOptionsConfig";
import { IPAddress } from "common/ip/IP";

export interface IHostsConfig {
  [id: number]: IHost;
}

export interface IHost {
  hostname: string;
  hardware: string;
  fixedAddress: IPAddress;
  ddnsHostname: string;
  options: IOptionsConfig;
}