import * as React from "react";

export interface IInputGroupProps {
  onChange: (name: string, value: any) => void;
}

export default class InputGroup extends React.Component<IInputGroupProps, {}> {
  constructor(props: IInputGroupProps) {
    super(props);
  }

  public render(): JSX.Element {
    const transformedChildren = React.Children.map(
      this.props.children,
      (child: any) => React.cloneElement(child, { onChange: this.inputOnChange }));

    return (
      <div>
        {transformedChildren}
      </div>
    );
  }

  private inputOnChange = (event: any) => {
    const name = event.target.name;

    let value = event.target.value;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }

    this.props.onChange(name, value);
  }
}
