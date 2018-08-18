import TextInput from "components/form-controls/TextInput";
import * as React from "react";

export interface ITableProps {
  columns: string[];
}

export interface ITableState {
  filter: string;
}

export default class Table extends React.Component<ITableProps, ITableState> {
  constructor(props: ITableProps) {
    super(props);

    this.state = {
      filter: ""
    };
  }

  public render() {
    const columns = [];
    for (const header of this.props.columns) {
      columns.push(<th scope="col">{header}</th>);
    }

    console.log(this.state.filter);

    const childComponents = React.Children.toArray(this.props.children);
    let children: React.ReactChild[] = [];
    if (!this.state.filter) {
      children = childComponents;
    } else {
      for (const child of React.Children.toArray(this.props.children)) {
        const props = (child as React.ReactElement<any>).props;
        for (const key in props) {
          if (props.hasOwnProperty(key)) {
            console.log(key + " = ");
            console.log(props[key] + "");
          }
        }
      }
    }

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
            {children}
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
