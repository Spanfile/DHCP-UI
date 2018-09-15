import IInputProps from "common/IInputProps";
import { AddressRange, IPAddress } from "common/ip/IP";
import FormInputRow from "components/form/FormInputRow";
import * as React from "react";

export interface IAddressRangeInputState {
  from: string;
  to: string;
}

export default class AddressRangeInput extends React.Component<IInputProps<string>, IAddressRangeInputState> {
  constructor(props: IInputProps<string>) {
    super(props);

    const range = AddressRange.fromRangeString(props.value!);
    this.state = {
      from: range.from.toString(),
      to: range.to.toString()
    };
  }

  public render(): JSX.Element {
    return (
      <FormInputRow {...this.props} innerRow={true}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control rounded-0 text-right"
            style={{ maxWidth: "12em" }}
            onChange={this.onRangeChange("from")}
            value={this.state.from} />
        </div>
        <div className="col-auto">
          <label
            className="col-sm-1 col-form-label"
            style={{ maxWidth: "1em" }}>-</label>
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control rounded-0"
            style={{ maxWidth: "12em" }}
            onChange={this.onRangeChange("to")}
            value={this.state.to} />
        </div>
      </FormInputRow>
    );
  }

  private readonly onRangeChange = (property: keyof IAddressRangeInputState) =>
    // tslint:disable-next-line:no-any
    (event: any) => {
      const value = event.target.value;

      const state = {};
      state[property] = value;

      this.setState(state, () => {
        try {
          const from = IPAddress.parseString(this.state.from);
          const to = IPAddress.parseString(this.state.to);

          this.props.onChange!({
            target: {
              name: this.props.name,
              value: AddressRange.fromAddressPair(from, to).toString()
            }
          });
        }
        catch (e) {
          return;
        }
      });
    }
}
