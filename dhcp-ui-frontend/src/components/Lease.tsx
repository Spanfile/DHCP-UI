import ILease from "common/ILease";
import * as React from "react";

export default class Lease extends React.Component<ILease, {}> {
  constructor(props: ILease) {
    super(props);
  }

  public render() {
    const address = this.toDotted(this.props.address);
    const hardware = this.toMac(this.props.hardware.toString(16));
    const ends = this.props.ends.format("DD/MM/YYYY HH:mm:ss");

    return (
      <tr>
        <td scope="row">{address}</td>
        <td className="text-monospace">{hardware}</td>
        <td>{this.props.hostname}</td>
        <td>{ends}</td>
      </tr>
    );
  }

  private toDotted(ipNum: number): string {
    const oct1 = ipNum & 255;
    const oct2 = (ipNum >> 8) & 255;
    const oct3 = (ipNum >> 16) & 255;
    const oct4 = (ipNum >> 24) & 255;

    return oct4 + "." + oct3 + "." + oct2 + "." + oct1;
  }

  private toMac(hex: string): string {
    hex = this.pad(hex, 12);
    hex = hex.substr(0, 2) + ":" + hex.substr(2);
    hex = hex.substr(0, 5) + ":" + hex.substr(5);
    hex = hex.substr(0, 8) + ":" + hex.substr(8);
    hex = hex.substr(0, 11) + ":" + hex.substr(11);
    hex = hex.substr(0, 14) + ":" + hex.substr(14);
    return hex;
  }

  private pad(str: string, size: number): string {
    while (str.length < size) {
      str = "0" + str;
    }
    return str;
  }
}
