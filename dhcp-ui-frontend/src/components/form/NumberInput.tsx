import * as React from "react";

export interface INumberInputProps {
  label: string;
  name: string;
  onChange?: (event: any) => void;
}

export default class NumberInput extends React.Component<INumberInputProps, {}> {
  constructor(props: INumberInputProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-right">{this.props.label}</label>
        <div className="col-sm-9">
          <input type="number" className="form-control rounded-0" name={this.props.name} onChange={this.props.onChange} />
        </div>
      </div>
    );
  }
}
