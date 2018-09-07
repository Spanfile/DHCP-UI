import { AddressRange, Subnet } from "../ip/IP";

export default interface IDHCPSubnet {
  id: number;
  subnet: Subnet;
  range: AddressRange;
}
