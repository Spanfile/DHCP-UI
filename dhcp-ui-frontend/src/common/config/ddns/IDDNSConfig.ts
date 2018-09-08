import IDDNSZone from "./IDDNSZone";
import IDNSSECKey from "./IDNSSECKey";

export enum DDNSUpdateStyle {
  AdHoc = "ad-hoc",
  Interim = "interim",
  None = "none"
}

export interface IDNSSECKeys {
  [id: number]: IDNSSECKey;
}

export interface IDDNSZones {
  [id: number]: IDDNSZone;
}

export default interface IDDNSConfig {
  updates: boolean;
  updateStyle: DDNSUpdateStyle;
  domainName: string;
  reverseDomainName: string;
  ignoreClientUpdates: boolean;
  updateStaticLeases: boolean;
  useHostDeclNames: boolean;

  keys: IDNSSECKeys;
  zones: IDDNSZones;
}
