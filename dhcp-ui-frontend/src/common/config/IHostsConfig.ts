import { ICommonConfig, IConfigCollection } from "common/config/ICommonConfig";
import { IOptionsConfig } from "common/config/IOptionsConfig";

export type IHostsConfig = IConfigCollection<IHostConfig>;

export default interface IHostConfig extends ICommonConfig<ICommonHostConfig> {
  options: IOptionsConfig;
}

export interface ICommonHostConfig {
  hostname: string;
  hardware: string;
  fixedAddress: string;
  ddnsHostname: string;
}
