import { IPAddress } from "./ip/IP";

export default interface IGlobalConfig {
  authoritative: boolean;
  defaultLeaseTime: number;
  maxLeaseTime: number;
  domainName: string;
  domainNameServers: IPAddress[];
}
