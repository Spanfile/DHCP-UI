import IInputProps from "common/IInputProps";
import { IPAddress } from "common/ip/IP";
import * as React from "react";

export interface IAddressInputInputState {
  address: string;
}

export default class AddressInput extends React.Component<IInputProps<IPAddress>, IAddressInputInputState> {
  constructor(props: IInputProps<IPAddress>) {
    super(props);

    this.state = {
      address: this.props.value!.toString(),
    };
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label text-right">{this.props.label}</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control rounded-0"
            onChange={this.onAddressChange}
            value={this.state.address} />
        </div>
      </div>
    );
  }

  private onAddressChange = (event: any) => {
    const value = event.target.value;
    this.setState({
      address: value
    });

    try {
      const address = IPAddress.parseString(value);

      if (this.props.onChange) {
        this.props.onChange({
          target: {
            name: this.props.name,
            value: address
          }
        });
      }
    }
    catch (e) {
      return;
    }
  }
}
