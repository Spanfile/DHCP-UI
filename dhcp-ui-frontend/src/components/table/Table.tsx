import IData from "common/IData";
import ITableColumn from "common/ITableColumn";
import ITableRow from "common/ITableRow";
import TextInput from "components/form-controls/TextInput";
import * as React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export interface ITableProps<T extends IData> {
  dataSource: T[];
  columns: ITableColumn[];
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
    const columns: any[] = [<TableHeader key={"select"} header={""} />];
    const rowObjects: ITableRow[] = [];
    const filter = this.state.filter;

    for (const column of this.props.columns) {
      columns.push(<TableHeader key={column.header} header={column.header} />);
    }

    for (const row of this.props.dataSource) {
      const values: any[] = [];
      let filterMatches = !filter;

      for (const column of this.props.columns) {
        if (!row.hasOwnProperty(column.property)) {
          console.warn("row object has no property '" + column.property + "'");
          continue;
        }

        const value = row[column.property];

        if (typeof value !== "string") {
          console.warn("row property '" + column.property + "' is not a string");
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

    const rows = rowObjects.map(row => <TableRow key={row.key} values={row.values} />);

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
              {columns}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

  private inputChanged = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const state = {};
    state[name] = value;

    this.setState(state);
  }
}
