import { IPAddress } from "./ip/IP";

export default interface IGlobalConfig {
  authoritative: boolean;
  defaultLeaseTime: number;
  maxLeaseTime: number;
  domainName: string;
  domainNameServers: IPAddress[];

  ddnsUpdates: boolean;
  ddnsUpdateStyle: string;
  ddnsDomainName: string;
  ddnsReverseDomainName: string;
  ignoreClientUpdates: boolean;
  updateStaticLeases: boolean;
  useHostDeclNames: boolean;
}
