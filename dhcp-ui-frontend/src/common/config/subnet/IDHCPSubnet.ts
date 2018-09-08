import { AddressRange, Subnet } from "common/ip/IP";

export default interface IDHCPSubnet {
  subnet: Subnet;
  range: AddressRange;
}
