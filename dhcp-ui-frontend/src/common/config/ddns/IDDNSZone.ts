import { IConfigCollection } from "common/config/ICommonConfig";

export type IDDNSZones = IConfigCollection<IDDNSZone>;

export interface IDDNSZone {
  domain: string;
  primary: string;
  key: string;
}
