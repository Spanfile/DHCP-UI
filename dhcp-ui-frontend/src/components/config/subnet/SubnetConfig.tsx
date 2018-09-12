import { IDHCPSubnet } from "common/config/subnet/IDHCPSubnet";
import Button, { ButtonStyle } from "components/Button";
import { DeletableConfig } from "components/config/DeletableConfig";
import HostsConfig from "components/config/hosts/HostsConfig";
import OptionsConfig from "components/config/options/OptionsConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import AddressRangeInput from "components/form/inputs/AddressRangeInput";
import SubnetInput from "components/form/inputs/SubnetInput";
import * as React from "react";

export const SubnetConfig = DeletableConfig<IDHCPSubnet>("subnet", props => {
  const onConfigChanged = (conf: keyof IDHCPSubnet, id: number, value: any) => {
    const config = props.config[conf];
    if (value == null) {
      delete config[id];
    } else {
      config[id] = value;
    }
    props.onChange(conf, config);
  };

  return (
    <div>
      <Card title="Common">
        <InputGroup<IDHCPSubnet>
          onChange={props.onChange}
          source={props.config} >
          <SubnetInput label="Subnet" name="subnet" />
          <AddressRangeInput label="Range" name="range" />
        </InputGroup>
      </Card>
      <Card title="Options">
        <OptionsConfig
          config={props.config.options}
          onChange={(name, value) => onConfigChanged("options", name, value)}
        />
      </Card>
      <Card title="Hosts">
        <HostsConfig
          config={props.config.hosts}
          onChange={(name, value) => onConfigChanged("hosts", name, value)}
        />
      </Card>
      <Button style={ButtonStyle.Danger} onClick={props.openDeleteModal}>
        Delete subnet
      </Button>
    </div>
  );
});