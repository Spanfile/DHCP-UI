import IData from "common/IData";
import ITableColumn from "common/ITableColumn";
import ITableRow from "common/ITableRow";
import TextInput from "components/form/inputs/TextInput";
import * as React from "react";
import EmptyTableRow from "./EmptyTableRow";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export interface ITableProps<T extends IData> {
  dataSource: T[];
  columns: ITableColumn[];
  emptyDisplay: string;
}

export interface ITableState {
  filter: string;
}

export default class Table<T extends IData> extends React.Component<ITableProps<T>, ITableState> {
  constructor(props: ITableProps<T>) {
    super(props);

    this.state = {
      filter: ""
    };
  }

  public render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-5 offset-sm-7">
            <TextInput
              label="Filter"
              name="filter"
              onChange={this.inputChanged}
            />
          </div>
        </div>
        <table className="table table-sm table-striped">
          <thead className="thead-light">
            <tr>
              {this.buildColumns()}
            </tr>
          </thead>
          <tbody>
            {this.buildRows()}
          </tbody>
        </table>
      </div>
    );
  }

  private buildColumns() {
    return [
      <TableHeader key={"select"} header={""} />,
      ...this.props.columns.map(column => <TableHeader key={column.header} header={column.header} />)
    ];
  }

  private buildRows() {
    const rowObjects: Array<ITableRow<string>> = [];
    const filter = this.state.filter;

    if (this.props.dataSource.length === 0) {
      return [
        <EmptyTableRow key={"empty"} width={this.props.columns.length + 1} message={this.props.emptyDisplay} />
      ];
    }

    for (const row of this.props.dataSource) {
      const values: string[] = [];
      let filterMatches = !filter;

      for (const column of this.props.columns) {
        if (!row.hasOwnProperty(column.property)) {
          console.warn("row object has no property '" + column.property + "'");
          values.push("");
          continue;
        }

        const value = row[column.property];

        // silently fail on null and undefined
        if (!value) {
          values.push("");
          continue;
        }

        if (typeof value !== "string") {
          console.warn("row property '" + column.property + "' is not a string: " + value);
          values.push("");
          continue;
        }

        if (!filterMatches) {
          filterMatches = value.includes(filter);
        }

        values.push(value);
      }

      if (!filterMatches) {
        continue;
      }

      rowObjects.push({
        key: row.key,
        values
      });
    }

    if (rowObjects.length === 0) {
      return [
        <EmptyTableRow key={"empty"} width={this.props.columns.length + 1} message={"No matching leases"} />
      ];
    }

    return rowObjects.map(row => <TableRow key={row.key} values={row.values} />);
  }

  private readonly inputChanged = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const state = {};
    state[name] = value;

    this.setState(state);
  }
}
