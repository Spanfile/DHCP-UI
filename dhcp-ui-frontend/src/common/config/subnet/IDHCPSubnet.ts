import { IConfigCollection } from "common/config/ICommonConfig";
import { IHostsConfig } from "common/config/IHostsConfig";
import { IOptionsConfig } from "common/config/IOptionsConfig";

export type IDHCPSubnetsConfig = IConfigCollection<IDHCPSubnet>;

export default interface IDHCPSubnet {
  common: ICommonDHCPSubnetConfig;
  options: IOptionsConfig;
  hosts: IHostsConfig;
}

export interface ICommonDHCPSubnetConfig {
  subnet: string;
  range: string;
}
