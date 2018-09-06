import { Subnet } from "../ip/IP";

export default class DHCPSubnet {
  public id: number;
  public subnet: Subnet;

  constructor(id: number, subnet: Subnet) {
    this.id = id;
    this.subnet = subnet;
  }
}
