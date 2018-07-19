import * as React from "react";

export interface ITextInputProps {
  label: string,
  name: string,
  value: string,
  onChange: (event: any) => void
}

export default class TextInput extends React.Component<ITextInputProps, {}> {
  constructor(props: ITextInputProps) {
    super(props);
  }

  public render() {
    const label = this.props.label;
    const name = this.props.name;
    const value = this.props.value;
    const onChange = this.props.onChange;

    return (
      <div className="form-group row" >
        <label className="col-sm-4 col-form-label">{label}</label>
        <div className="col-sm-8">
          <input type="text" className="form-control rounded-0" name={name} onChange={onChange} value={value} />
        </div>
      </div>
    );
  }
}
