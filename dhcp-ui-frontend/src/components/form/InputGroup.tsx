import * as React from "react";

export interface IInputGroupProps<T> {
  source: T;
  onChange: (name: string, value: any) => void;
}

export default class InputGroup<T> extends React.Component<IInputGroupProps<T>, {}> {
  constructor(props: IInputGroupProps<T>) {
    super(props);
  }

  public render(): JSX.Element {
    const transformedChildren = React.Children.map(
      this.props.children,
      (child: any) => React.cloneElement(child, {
        onChange: this.onInputChange,
        value: this.props.source[child.props.name]
      }));

    return (
      <div>
        {transformedChildren}
      </div>
    );
  }

  private onInputChange = (event: any) => {
    const name = event.target.name;

    let value = event.target.value;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }

    this.props.onChange(name, value);
  }
}
