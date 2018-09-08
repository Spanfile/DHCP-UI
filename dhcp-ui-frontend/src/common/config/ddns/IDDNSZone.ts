export interface IDDNSZones {
  [id: number]: IDDNSZone;
}

export interface IDDNSZone {
  domain: string;
  primary: string;
  key: string;
}