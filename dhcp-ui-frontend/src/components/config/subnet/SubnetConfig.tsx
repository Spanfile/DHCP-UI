import DHCPSubnet from "common/subnet/DHCPSubnet";
import * as React from "react";

export interface ISubnetConfigProps {
  subnet: DHCPSubnet;
}

export default class SubnetConfig extends React.Component<ISubnetConfigProps, {}> {
  constructor(props: ISubnetConfigProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div />
    );
  }
}
