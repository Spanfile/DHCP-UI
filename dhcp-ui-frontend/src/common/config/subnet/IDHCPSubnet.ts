import { IHostsConfig } from "common/config/IHostsConfig";
import { IOptionsConfig } from "common/config/IOptionsConfig";
import { AddressRange, Subnet } from "common/ip/IP";

export interface ISubnetsConfig {
  [id: number]: IDHCPSubnet;
}

export interface IDHCPSubnet {
  subnet: Subnet;
  range: AddressRange;
  options: IOptionsConfig;
  hosts: IHostsConfig;
}
