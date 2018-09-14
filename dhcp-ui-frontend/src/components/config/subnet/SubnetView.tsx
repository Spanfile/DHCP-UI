import IConfigProps from "common/config/IConfigProps";
import IDHCPSubnet, { IDHCPSubnetsConfig } from "common/config/subnet/IDHCPSubnet";
import { SubnetConfig } from "components/config/subnet/SubnetConfig";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router";

export interface ISubnetViewProps extends IConfigProps<IDHCPSubnetsConfig> {
  onSubnetDelete: (id: number) => void;
}

export default class SubnetView extends React.Component<ISubnetViewProps, {}> {
  constructor(props: ISubnetViewProps) {
    super(props);
  }

  public render(): JSX.Element {
    let firstSubnetId: any = null;
    const subnetRoutes: JSX.Element[] = [];
    Object.entries(this.props.config).forEach(([id, subnet]) => {
      if (!firstSubnetId) {
        firstSubnetId = id;
      }

      subnetRoutes.push(<Route key={id} path={"/config/subnets/" + id} render={
        () =>
          <SubnetConfig
            config={subnet}
            onChange={(name, value) => this.onSubnetChange(Number(id), name, value)}
            onDelete={() => this.props.onSubnetDelete(Number(id))}
          />
      } />);
    });

    return (
      <Switch>
        <Redirect exact={true} from="/config/subnets" to={"/config/subnets/" + firstSubnetId} />
        {subnetRoutes}
      </Switch>
    );
  }

  private onSubnetChange = (id: number, name: keyof IDHCPSubnet, value: any) => {
    const subnet = this.props.config[id];
    subnet[name] = value;
    this.props.onChange(id, subnet);
  }
}
