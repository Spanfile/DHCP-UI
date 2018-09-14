import { ICommonConfig, IConfigCollection } from "common/config/ICommonConfig";
import { IOptionsConfig } from "common/config/IOptionsConfig";
import { IPAddress } from "common/ip/IP";

export type IHostsConfig = IConfigCollection<IHostConfig>;

export default interface IHostConfig extends ICommonConfig<ICommonHostConfig> {
  options: IOptionsConfig;
}

export interface ICommonHostConfig {
  hostname: string;
  hardware: string;
  fixedAddress: IPAddress;
  ddnsHostname: string;
}