import { ISubnetsConfig } from "common/config/subnet/IDHCPSubnet";
import IDDNSConfig from "./ddns/IDDNSConfig";
import IGlobalConfig from "./IGlobalConfig";

export default interface IDHCPConfig {
  global: IGlobalConfig;
  ddns: IDDNSConfig;
  subnets: ISubnetsConfig;
}