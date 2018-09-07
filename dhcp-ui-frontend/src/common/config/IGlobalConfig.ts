export interface IGlobalConfig {
  authoritative: boolean;
  defaultLeaseTime: number;
  maxLeaseTime: number;

  ddnsSettings: IDDNSSettings;
}

export interface IDDNSSettings {
  updates: boolean;
  updateStyle: "ad-hoc" | "interim" | "none";
  domainName: string;
  reverseDomainName: string;
  ignoreClientUpdates: boolean;
  updateStaticLeases: boolean;
  useHostDeclNames: boolean;
}
