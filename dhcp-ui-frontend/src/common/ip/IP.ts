export class IPAddress {
  public static parseString(addressString: string) {
    const octets = addressString.split(".").map(octet => Number(octet));
    return new IPAddress(octets);
  }

  private octet1: number;
  private octet2: number;
  private octet3: number;
  private octet4: number;

  private constructor(octets: number[]) {
    this.octet1 = octets[0];
    this.octet2 = octets[1];
    this.octet3 = octets[2];
    this.octet4 = octets[3];
  }

  public toString(): string {
    return this.octet1 + "." + this.octet2 + "." + this.octet3 + "." + this.octet4;
  }
}

export class Subnet {
  public static parseCidr(subnetString: string): Subnet {
    const args = subnetString.split("/");
    const identifier = IPAddress.parseString(args[0]);
    const cidr = Number(args[1]);

    return new Subnet(identifier, cidr);
  }

  public static fromIdentifierAndMask(identifier: IPAddress, mask: IPAddress) {
    return new Subnet(identifier, 32);
  }

  public static fromIdentifierAndCidr(identifier: IPAddress, cidr: number) {
    return new Subnet(identifier, cidr);
  }

  public identifier: IPAddress;
  public cidr: number;

  private constructor(identifier: IPAddress, cidr: number) {
    this.identifier = identifier;
    this.cidr = cidr;
  }

  public toString(): string {
    return this.identifier.toString() + "/" + this.cidr;
  }
}