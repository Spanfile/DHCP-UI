import { IConfigCollection } from "common/config/ICommonConfig";

export type IOptionsConfig = IConfigCollection<IOptionConfig>;

export interface IOptionConfig {
  name: string;
  expression: string;
}