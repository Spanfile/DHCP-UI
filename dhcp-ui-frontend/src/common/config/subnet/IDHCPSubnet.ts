import { IConfigCollection } from "common/config/ICommonConfig";
import { IHostsConfig } from "common/config/IHostsConfig";
import { IOptionsConfig } from "common/config/IOptionsConfig";
import { AddressRange, Subnet } from "common/ip/IP";

export type IDHCPSubnetsConfig = IConfigCollection<IDHCPSubnet>;

export default interface IDHCPSubnet {
  common: ICommonDHCPSubnetConfig;
  options: IOptionsConfig;
  hosts: IHostsConfig;
}

export interface ICommonDHCPSubnetConfig {
  subnet: Subnet;
  range: AddressRange;
}
