import IInputProps from "common/IInputProps";
import { IPAddress } from "common/ip/IP";
import CommonInput from "components/form/CommonInput";
import * as React from "react";

export interface IAddressInputInputState {
  address: string;
}

export default class AddressInput extends React.Component<IInputProps<string>, IAddressInputInputState> {
  constructor(props: IInputProps<string>) {
    super(props);

    const address = IPAddress.parseString(this.props.value!);
    this.state = {
      address: address.toString(),
    };
  }

  public render(): JSX.Element {
    return (
      <CommonInput<string>
        type="text"
        label={this.props.label}
        name={this.props.name}
        value={this.state.address}
        onChange={this.onAddressChange} />
    );
  }

  private readonly onAddressChange = (event: any) => {
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
            value: address.toString(),
          }
        });
      }
    }
    catch (e) {
      return;
    }
  }
}
