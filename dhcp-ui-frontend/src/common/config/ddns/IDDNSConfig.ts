import { IDDNSZones } from "common/config/ddns/IDDNSZone";
import { IDNSSECKeys } from "common/config/ddns/IDNSSECKey";

export enum DDNSUpdateStyle {
  AdHoc = "ad-hoc",
  Interim = "interim",
  None = "none"
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
