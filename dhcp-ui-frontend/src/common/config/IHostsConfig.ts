import { IOptionsConfig } from "common/config/IOptionsConfig";

export interface IHostsConfig {
  [id: number]: IHost;
}

export interface IHost {
  hostname: string;
  hardware: string;
  fixedAddress: string;
  ddnsHostname: string;
  options: IOptionsConfig;
}