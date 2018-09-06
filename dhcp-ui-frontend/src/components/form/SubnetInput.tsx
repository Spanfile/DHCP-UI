import IInputProps from "common/IInputProps";
import { IPAddress, Subnet } from "common/ip/IP";
import * as React from "react";

export interface ISubnetInputState {
  identifier: string;
  cidr: number;
}

export default class SubnetInput extends React.Component<IInputProps<Subnet>, ISubnetInputState> {
  constructor(props: IInputProps<Subnet>) {
    super(props);

    this.state = {
      identifier: this.props.value!.identifier.toString(),
      cidr: this.props.value!.cidr
    };
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-right">{this.props.label}</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control rounded-0 float-left text-right"
            style={{ maxWidth: "12em" }}
            onChange={this.onIdentifierChange}
            value={this.state.identifier.toString()} />
          <label
            className="col-sm-1 col-form-label float-left"
            style={{ maxWidth: "1em" }}
          >/</label>
          <input
            type="number"
            className="form-control rounded-0"
            style={{ maxWidth: "5em" }}
            min="1"
            max="31"
            onChange={this.onCidrChange}
            value={this.state.cidr}
          />
        </div>
      </div>
    );
  }

  private onIdentifierChange = (event: any) => {
    const value = event.target.value;
    this.setState({
      identifier: value
    });

    try {
      const identifier = IPAddress.parseString(value);

      if (this.props.onChange) {
        this.props.onChange({
          target: {
            name: this.props.name,
            value: Subnet.fromIdentifierAndCidr(identifier, this.state.cidr)
          }
        });
      }
    }
    catch (e) {
      return;
    }
  }

  private onCidrChange = (event: any) => {
    const value = event.target.value;
    this.setState({
      cidr: value
    });

    if (this.props.onChange) {
      this.props.onChange({
        target: {
          name: this.props.name,
          value: Subnet.fromIdentifierAndCidr(IPAddress.parseString(this.state.identifier), value)
        }
      });
    }
  }
}
