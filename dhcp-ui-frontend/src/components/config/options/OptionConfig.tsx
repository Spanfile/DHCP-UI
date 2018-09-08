import IConfigProps from "common/config/IConfigProps";
import { IOption } from "common/config/IOptionsConfig";
import Button, { ButtonStyle } from "components/Button";
import * as React from "react";

export interface IOptionConfigProps extends IConfigProps<IOption> {
  onDelete: () => void;
}

export default class OptionConfig extends React.Component<IOptionConfigProps, {}> {
  constructor(props: IOptionConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group">
        <label className="col-form-label float-left mr-3">
          Option
        </label>
        <input
          type="text"
          className="form-control rounded-0 float-left"
          style={{ maxWidth: "16em" }}
          onChange={(event) => this.props.onChange("name", event.target.value)}
          value={this.props.config.name} />
        <label className="col-form-label float-left mr-3 ml-5">
          Expression
        </label>
        <input
          type="text"
          className="form-control rounded-0 float-left"
          style={{ maxWidth: "16em" }}
          onChange={(event) => this.props.onChange("expression", event.target.value)}
          value={this.props.config.expression} />
        <div className="float-right">
          <Button label="Delete" style={ButtonStyle.Danger} onClick={this.props.onDelete} />
        </div>
      </div>
    );
  }
}