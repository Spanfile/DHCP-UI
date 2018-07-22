import * as React from "react";

export interface ITextInputProps {
  label: string,
  name: string,
  value?: string,
  onChange: (event: any) => void
}

export default class TextInput extends React.Component<ITextInputProps, {}> {
  constructor(props: ITextInputProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label text-right">{this.props.label}</label>
        <div className="col-sm-9">
          <input type="text" className="form-control rounded-0" name={this.props.name} onChange={this.props.onChange} value={this.props.value} />
        </div>
      </div>
    );
  }
}
