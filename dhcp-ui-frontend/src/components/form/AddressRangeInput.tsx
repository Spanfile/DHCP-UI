import IInputProps from "common/IInputProps";
import { AddressRange, IPAddress } from "common/ip/IP";
import * as React from "react";

export interface IAddressRangeInputState {
  from: string;
  to: string;
}

export default class AddressRangeInput extends React.Component<IInputProps<AddressRange>, IAddressRangeInputState> {
  constructor(props: IInputProps<AddressRange>) {
    super(props);

    this.state = {
      from: this.props.value!.from.toString(),
      to: this.props.value!.to.toString()
    };
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label text-right">{this.props.label}</label>
        <div className="col-sm-8 form-row">
          <div className="col-auto">
            <input
              type="text"
              className="form-control rounded-0 float-left text-right"
              style={{ maxWidth: "12em" }}
              onChange={this.onFromChange}
              value={this.state.from} />
          </div>
          <div className="col-auto">
            <label
              className="col-sm-1 col-form-label float-left"
              style={{ maxWidth: "1em" }}
            >-</label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control rounded-0 float-left"
              style={{ maxWidth: "12em" }}
              onChange={this.onToChange}
              value={this.state.to} />
          </div>
        </div>
      </div>
    );
  }

  private onFromChange = (event: any) => {
    const value = event.target.value;
    this.setState({
      from: value
    });

    try {
      const from = IPAddress.parseString(value);

      if (this.props.onChange) {
        this.props.onChange({
          target: {
            name: this.props.name,
            value: AddressRange.fromAddressPair(from, this.props.value!.to)
          }
        });
      }
    }
    catch (e) {
      return;
    }
  }

  private onToChange = (event: any) => {
    const value = event.target.value;
    this.setState({
      to: value
    });

    try {
      const to = IPAddress.parseString(value);

      if (this.props.onChange) {
        this.props.onChange({
          target: {
            name: this.props.name,
            value: AddressRange.fromAddressPair(this.props.value!.from, to)
          }
        });
      }
    }
    catch (e) {
      return;
    }
  }
}
