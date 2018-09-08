import { AddressRange, Subnet } from "common/ip/IP";

export interface ISubnetsConfig {
  [id: number]: IDHCPSubnet;
}

export interface IDHCPSubnet {
  subnet: Subnet;
  range: AddressRange;
}
