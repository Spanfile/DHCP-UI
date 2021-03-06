export class IPAddress {
  public static parseString(addressString: string) {
    const octets = addressString.split(".").map(Number);

    if (octets.length !== 4 || octets.some(octet => octet < 0 || octet > 255)) {
      throw TypeError(addressString + " is not a valid IPv4 address");
    }

    return new IPAddress(octets);
  }

  private readonly octet1: number;
  private readonly octet2: number;
  private readonly octet3: number;
  private readonly octet4: number;

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

export class AddressRange {
  public static fromAddressPair(from: IPAddress, to: IPAddress) {
    return new AddressRange(from, to);
  }

  public static fromAddressStringPair(from: string, to: string) {
    return new AddressRange(IPAddress.parseString(from), IPAddress.parseString(to));
  }

  public static fromRangeString(rangeString: string) {
    const rangeArgs = rangeString.split("-");
    return new AddressRange(IPAddress.parseString(rangeArgs[0]), IPAddress.parseString(rangeArgs[1]));
  }

  public from: IPAddress;
  public to: IPAddress;

  private constructor(from: IPAddress, to: IPAddress) {
    this.from = from;
    this.to = to;
  }

  public toString(): string {
    return this.from.toString() + "-" + this.to.toString();
  }
}
