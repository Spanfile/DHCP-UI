import IInputProps from "common/IInputProps";
import { IPAddress } from "common/ip/IP";
import CommonInput from "components/form/CommonInput";
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
      <CommonInput<string>
        type="text"
        label={this.props.label}
        name={this.props.name}
        value={this.state.address}
        onChange={this.onAddressChange}
      />
    );
  }

  private readonly onAddressChange = (event: any) => {
    const value: string = event.target.value;
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
