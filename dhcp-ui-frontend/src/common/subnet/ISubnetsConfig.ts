import IDHCPSubnet from "./IDHCPSubnet";

export default interface ISubnetsConfig {
  subnets: {
    [id: number]: IDHCPSubnet
  };
}
