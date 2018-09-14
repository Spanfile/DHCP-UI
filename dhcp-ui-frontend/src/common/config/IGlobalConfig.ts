import { ICommonConfig } from "common/config/ICommonConfig";
import { IOptionsConfig } from "./IOptionsConfig";

export default interface IGlobalConfig extends ICommonConfig<ICommonGlobalConfig> {
  options: IOptionsConfig;
}

export interface ICommonGlobalConfig {
  authoritative: boolean;
  defaultLeaseTime: number;
  maxLeaseTime: number;
}
