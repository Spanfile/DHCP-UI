import * as React from "react";

export interface ITableRowProps {
  values: string[];
}

export interface ITableRowState {
  selected: boolean;
}

export default class TableRow extends React.Component<ITableRowProps, ITableRowState> {
  constructor(props: ITableRowProps) {
    super(props);

    this.state = {
      selected: false
    };
  }

  public render() {
    const rowCells: JSX.Element[] = this.props.values.map(value => <td key={value}>{value}</td>);

    return (
      <tr>
        <td scope="row">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="check"
            />
          </div>
        </td>
        {rowCells}
      </tr>
    );
  }
}
