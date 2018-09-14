import IInputProps from "common/IInputProps";
import { IPAddress, Subnet } from "common/ip/IP";
import FormInputRow from "components/form/FormInputRow";
import * as React from "react";

export interface ISubnetInputState {
  identifier: string;
  cidr: number;
}

export default class SubnetInput extends React.Component<IInputProps<string>, ISubnetInputState> {
  constructor(props: IInputProps<string>) {
    super(props);

    const subnet = Subnet.parseCidr(this.props.value!);
    this.state = {
      identifier: subnet.identifier.toString(),
      cidr: subnet.cidr
    };
  }

  public render(): JSX.Element {
    return (
      <FormInputRow {...this.props} innerRow={true}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control rounded-0 float-left text-right"
            onChange={this.onSubnetChange("identifier")}
            value={this.state.identifier.toString()} />
        </div>
        <div className="col-auto">
          <label
            className="col-sm-1 col-form-label float-left"
            style={{ maxWidth: "1em" }}
          >/</label>
        </div>
        <div className="col-sm-1">
          <input
            type="number"
            className="form-control rounded-0"
            min="1"
            max="31"
            onChange={this.onSubnetChange("cidr")}
            value={this.state.cidr}
          />
        </div>
      </FormInputRow>
    );
  }

  private readonly onSubnetChange = (property: keyof ISubnetInputState) =>
    (event: any) => {
      const value = event.target.value;
      const state = {};
      state[property] = value;
      this.setState(state, () => {
        try {
          const identifier = IPAddress.parseString(this.state.identifier);

          this.props.onChange!({
            target: {
              name: this.props.name,
              value: Subnet.fromIdentifierAndCidr(identifier, this.state.cidr).toString()
            }
          });
        }
        catch (e) {
          return;
        }
      });
    }
}
