import * as React from "react";

export interface IToggledTextInputProps {
  label: string;
  checkLabel: string;
  name: string;
  checkName: string;
  value?: string;
  checkValue?: boolean;
  // tslint:disable-next-line:no-any
  onChange: (event: any) => void;
}

export interface IToggledTextInputState {
  textEnabled: boolean;
}

export default class ToggledTextInput extends React.Component<IToggledTextInputProps, IToggledTextInputState> {
  constructor(props: IToggledTextInputProps) {
    super(props);

    this.state = {
      textEnabled: props.checkValue ? !props.checkValue : true
    };
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row align-items-center" >
        <label className="col-sm-3 col-form-label text-right">{this.props.label}</label>
        <div className="col-sm-2">
          <div className="form-check form-check-inline toggled-text-input-check">
            <input
              className="form-check-input"
              type="checkbox"
              name={this.props.checkName}
              defaultChecked={this.props.checkValue}
              onChange={this.onCheckChange}
            />
            <label className="form-check-label">{this.props.checkLabel}</label>
          </div>
        </div>
        <div className="col-sm-7">
          <input
            type="text"
            className="form-control rounded-0"
            name={this.props.name}
            onChange={this.props.onChange}
            value={this.props.value}
            disabled={!this.state.textEnabled}
          />
        </div>
      </div>
    );
  }

  // tslint:disable-next-line:no-any
  private readonly onCheckChange = (event: any) => {
    this.setState({
      textEnabled: !event.target.checked
    });
  }
}
