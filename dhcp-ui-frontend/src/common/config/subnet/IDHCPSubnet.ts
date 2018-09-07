import { AddressRange, Subnet } from "common/ip/IP";

export default interface IDHCPSubnet {
  id: number;
  subnet: Subnet;
  range: AddressRange;
}
