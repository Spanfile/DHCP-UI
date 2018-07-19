import * as React from "react";
import "./ToggledTextInput.css";

export interface IToggledTextInputProps {
  label: string,
  checkLabel: string,
  name: string,
  checkName: string,
  value?: string,
  checkValue?: boolean,
  onChange: (event: any) => void
}

export default class ToggledTextInput extends React.Component<IToggledTextInputProps, {}> {
  constructor(props: IToggledTextInputProps) {
    super(props);
  }

  public render() {
    return (
      <div className="form-group row" >
        <label className="col-sm-4 col-form-label">{this.props.label}</label>
        <div className="col-sm-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name={this.props.checkName}
              defaultChecked={this.props.checkValue}
              onChange={this.props.onChange}
            />
            <label className="form-check-label">
              {this.props.checkLabel}
            </label>
          </div>
        </div>
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control rounded-0"
            name={this.props.name}
            onChange={this.props.onChange}
            value={this.props.value}
          />
        </div>
      </div>
    );
  }
}
