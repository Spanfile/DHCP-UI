import API from "API";
import { DNSSECAlgorithm, IDNSSECKey, IDNSSECKeys } from "common/config/ddns/IDNSSECKey";
import IConfigProps, { ICollectionConfigProps, ValueOf } from "common/config/IConfigProps";
import ConfigCollectionView from "components/config/ConfigCollectionView";
import { KeyConfig } from "components/config/ddns/KeyConfig";
import * as React from "react";

export default class KeysConfig extends React.Component<IConfigProps<IDNSSECKeys>> {
  private keyConfig: React.ComponentClass<ICollectionConfigProps<IDNSSECKey>>;

  constructor(props: IConfigProps<IDNSSECKeys>) {
    super(props);

    this.keyConfig = KeyConfig(false);
  }

  public componentDidMount() {
    API.get("/generatednssec").then(response => {
      this.keyConfig = KeyConfig(response.data.available);
      this.forceUpdate();
    }).catch(reason => {
      console.log(reason);
    });
  }

  public render(): JSX.Element {
    return (
      <ConfigCollectionView<IDNSSECKey>
        config={this.props.config}
        addButtonText="Add key"
        component={this.keyConfig}
        onAdd={this.addKey}
        onChange={this.onKeyChange}
        onDelete={this.deleteKey} />
    );
  }

  private readonly onKeyChange = (id: number, name: keyof IDNSSECKey, value: ValueOf<IDNSSECKey>) => {
    const key = this.props.config[id];
    key[name] = value;
    this.props.onChange(id, key);
  }

  private readonly addKey = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newKey = {
      name: "Key " + newId,
      algorithm: DNSSECAlgorithm.HMAC_MD5,
      key: ""
    };
    this.props.onChange(newId, newKey);
  }

  private readonly deleteKey = (id: number) => {
    this.props.onChange(id, undefined);
  }
}
