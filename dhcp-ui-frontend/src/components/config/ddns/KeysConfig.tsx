import { DNSSECAlgorithm, IDNSSECKey, IDNSSECKeys } from "common/config/ddns/IDNSSECKey";
import { IConfigProps } from "common/config/IConfigProps";
import ConfigCollectionView from "components/config/ConfigCollectionView";
import { KeyConfig } from "components/config/ddns/KeyConfig";
import * as React from "react";

export default class KeysConfig extends React.Component<IConfigProps<IDNSSECKeys>, {}> {
  constructor(props: IConfigProps<IDNSSECKeys>) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <ConfigCollectionView<IDNSSECKey>
        config={this.props.config}
        addButtonText="Add key"
        component={KeyConfig}
        onAdd={this.addKey}
        onChange={this.onKeyChange}
        onDelete={this.deleteKey} />
    );
  }

  private onKeyChange = (id: number, name: keyof IDNSSECKey, value: any) => {
    const key = this.props.config[id];
    key[name] = value;
    this.props.onChange(id, key);
  }

  private addKey = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newKey = {
      name: "Key " + newId,
      algorithm: DNSSECAlgorithm.HMAC_MD5,
      key: ""
    };
    this.props.onChange(newId, newKey);
  }

  private deleteKey = (id: number) => {
    this.props.onChange(id, null);
  }
}
