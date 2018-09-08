import IConfigProps from "common/config/IConfigProps";
import IDHCPSubnet from "common/config/subnet/IDHCPSubnet";
import ISubnetsConfig from "common/config/subnet/ISubnetsConfig";
import AddressRangeInput from "components/form/AddressRangeInput";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import SubnetInput from "components/form/SubnetInput";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router";


export default class SubnetView extends React.Component<IConfigProps<ISubnetsConfig>, {}> {
  constructor(props: IConfigProps<ISubnetsConfig>) {
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
        // tslint:disable-next-line:jsx-no-lambda
        () =>
          <Card title="Common">
            <InputGroup<IDHCPSubnet>
              onChange={(name, value) => this.onSubnetChange(Number(id), name, value)}
              source={subnet} >
              <SubnetInput label="Subnet" name="subnet" />
              <AddressRangeInput label="Range" name="range" />
            </InputGroup>
          </ Card>} />);
    });

    return (
      <Switch>
        <Redirect exact={true} from="/config/subnets" to={"/config/subnets/" + firstSubnetId} />
        {subnetRoutes}
      </Switch>
    );
  }

  private onSubnetChange = (id: number, name: string, value: any) => {
    const subnet = this.props.config[id];
    subnet[name] = value;
    this.props.onChange(id.toString(), subnet);
  }
}
