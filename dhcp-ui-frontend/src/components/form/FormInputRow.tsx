import * as React from "react";

export interface IFormInputRowProps {
  label: string;
  innerRow?: boolean;
}

export default class FormInputRow extends React.Component<IFormInputRowProps> {
  constructor(props: IFormInputRowProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label text-right pr-0">{this.props.label}</label>
        <div className={"col-sm-8" + (this.props.innerRow ? " form-row" : "")}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
