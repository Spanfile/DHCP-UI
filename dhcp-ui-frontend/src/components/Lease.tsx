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
        <td scope="row">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="check"
            />
          </div>
        </td>
        <td>{address}</td>
        <td className="text-monospace">{hardware}</td>
        <td>{this.props.hostname}</td>
        <td>{ends}</td>
      </tr>
    );
  }

  private toDotted(ipNum: number): string {
    return [...Array(4).keys()].map(i => (ipNum >> (i * 8)) & 255).reverse().join(".");
  }

  private toMac(hex: string): string {
    hex = this.pad(hex, 12);
    for (let i = 2; i <= 14; i += 3) {
      hex = hex.substr(0, i) + ":" + hex.substr(i);
    }
    return hex;
  }

  private pad(str: string, size: number): string {
    while (str.length < size) {
      str = "0" + str;
    }
    return str;
  }
}
