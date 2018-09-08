import { IOptionsConfig } from "./IOptionsConfig";

export default interface IGlobalConfig {
  authoritative: boolean;
  defaultLeaseTime: number;
  maxLeaseTime: number;
  options: IOptionsConfig;
}
