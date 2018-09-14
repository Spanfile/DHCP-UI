import { IDDNSZones } from "common/config/ddns/IDDNSZone";
import { IDNSSECKeys } from "common/config/ddns/IDNSSECKey";
import { ICommonConfig } from "common/config/ICommonConfig";

export enum DDNSUpdateStyle {
  AdHoc = "ad-hoc",
  Interim = "interim",
  None = "none"
}

export default interface IDDNSConfig extends ICommonConfig<ICommonDDNSConfig> {
  keys: IDNSSECKeys;
  zones: IDDNSZones;
}

export interface ICommonDDNSConfig {
  updates: boolean;
  updateStyle: DDNSUpdateStyle;
  domainName: string;
  reverseDomainName: string;
  ignoreClientUpdates: boolean;
  updateStaticLeases: boolean;
  useHostDeclNames: boolean;
}
