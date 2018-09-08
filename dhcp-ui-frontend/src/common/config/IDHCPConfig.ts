import IDDNSConfig from "./IDDNSConfig";
import IGlobalConfig from "./IGlobalConfig";
import ISubnetsConfig from "./subnet/ISubnetsConfig";

export default interface IDHCPConfig {
  global: IGlobalConfig;
  ddns: IDDNSConfig;
  subnets: ISubnetsConfig;
}