import * as React from "react";

export interface IEmptyTableRowProps {
  width: number;
  message: string;
}

export default class EmptyTableRow extends React.Component<IEmptyTableRowProps> {
  constructor(props: IEmptyTableRowProps) {
    super(props);
  }

  public render() {
    return (
      <tr>
        <td scope="row" colSpan={this.props.width}>
          <div className="text-center">
            {this.props.message}
          </div>
        </td>
      </tr>
    );
  }
}
