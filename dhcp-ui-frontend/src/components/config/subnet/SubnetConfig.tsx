import { handleConfigChange } from "common/config/IConfigProps";
import IDHCPSubnet, { ICommonDHCPSubnetConfig } from "common/config/subnet/IDHCPSubnet";
import Button, { ButtonStyle } from "components/Button";
import { DeletableConfig } from "components/config/DeletableConfig";
import HostsConfig from "components/config/hosts/HostsConfig";
import OptionsConfig from "components/config/options/OptionsConfig";
import Card from "components/form/Card";
import InputGroup from "components/form/InputGroup";
import AddressRangeInput from "components/form/inputs/AddressRangeInput";
import SubnetInput from "components/form/inputs/SubnetInput";
import * as React from "react";

export const SubnetConfig = DeletableConfig<IDHCPSubnet>("subnet", props =>
  (
    <>
      <Card title="Common">
        <InputGroup<ICommonDHCPSubnetConfig>
          config={props.config.common}
          onChange={handleConfigChange("common", props)}>
          <SubnetInput label="Subnet" name="subnet" />
          <AddressRangeInput label="Range" name="range" />
        </InputGroup>
      </Card>
      <Card title="Options">
        <OptionsConfig
          config={props.config.options}
          onChange={handleConfigChange("options", props)}
        />
      </Card>
      <Card title="Hosts">
        <HostsConfig
          config={props.config.hosts}
          onChange={handleConfigChange("hosts", props)}
        />
      </Card>
      <div className="mb-3">
        <Button style={ButtonStyle.Danger} onClick={props.openDeleteModal}>Delete subnet</Button>
      </div>
    </>
  ));
