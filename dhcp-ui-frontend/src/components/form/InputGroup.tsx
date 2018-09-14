import IConfigProps from "common/config/IConfigProps";
import * as React from "react";

export default class InputGroup<T> extends React.Component<IConfigProps<T>> {
  constructor(props: IConfigProps<T>) {
    super(props);
  }

  public render(): JSX.Element {
    const transformedChildren = React.Children.map(
      this.props.children,

      (child: React.ReactElement<any>) => React.cloneElement(child, {
        onChange: this.onInputChange,
        value: this.props.config[child.props.name]
      }));

    return (
      <div>
        {transformedChildren}
      </div>
    );
  }

  private readonly onInputChange = (event: any) => {
    const name = event.target.name;

    let value: any = event.target.value;
    if (event.target.type === "checkbox") {
      value = (event.target.checked!) as any;
    }

    this.props.onChange(name, value);
  }
}
