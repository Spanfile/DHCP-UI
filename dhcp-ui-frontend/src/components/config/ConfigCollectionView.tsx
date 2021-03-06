import { IConfigCollection } from "common/config/ICommonConfig";
import { ICollectionConfigProps, ValueOf } from "common/config/IConfigProps";
import Button, { ButtonStyle } from "components/Button";
import * as React from "react";

export interface IConfigCollectionViewProps<T> {
  config: IConfigCollection<T>;
  component: React.ComponentClass<ICollectionConfigProps<T>> | React.StatelessComponent<ICollectionConfigProps<T>>;
  addButtonText: string;
  onAdd: () => void;
  onChange: (id: number, name: keyof T, value?: ValueOf<T>) => void;
  onDelete: (id: number) => void;
}

export default class ConfigCollectionView<T> extends React.Component<IConfigCollectionViewProps<T>> {
  constructor(props: IConfigCollectionViewProps<T>) {
    super(props);
  }

  public render(): JSX.Element {
    const Component = this.props.component;
    const configs: JSX.Element[] = [];
    let skippedFirst = false;

    Object.entries(this.props.config).forEach(([id, key]) => {
      let colClass = "col-sm-10";
      if (!skippedFirst) {
        skippedFirst = true;
      } else {
        colClass += " offset-sm-2";
      }

      configs.push(
        <div key={id} className={colClass}>
          <Component
            config={key}
            onChange={(name, value) => this.props.onChange(Number(id), name, value)}
            onDelete={() => this.props.onDelete(Number(id))} />
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-sm-2 mb-3 pr-0">
          <div className="float-right">
            <Button style={ButtonStyle.Success} onClick={this.props.onAdd}>{this.props.addButtonText}</Button>
          </div>
        </div>
        {configs}
      </div>
    );
  }
}
