import { DNSSECAlgorithm, IDNSSECKeys } from "common/config/ddns/IDNSSECKey";
import IConfigProps from "common/config/IConfigProps";
import Button, { ButtonStyle } from "components/Button";
import KeyConfig from "components/config/ddns/KeyConfig";
import * as React from "react";

export default class KeysConfig extends React.Component<IConfigProps<IDNSSECKeys>, {}> {
  constructor(props: IConfigProps<IDNSSECKeys>) {
    super(props);
  }

  public render(): JSX.Element {
    const keyConfigs: JSX.Element[] = [];
    let skippedFirst = false;

    Object.entries(this.props.config).forEach(([id, key]) => {
      let colClass = "col-sm-9";
      if (!skippedFirst) {
        skippedFirst = true;
      } else {
        colClass += " offset-sm-3";
      }

      keyConfigs.push(
        <div key={id} className={colClass}>
          <KeyConfig
            config={key}
            onChange={(name, value) => this.onInputChange(Number(id), name, value)}
            onDelete={() => this.deleteKey(Number(id))}
          />
        </div>);
    });

    return (
      <div className="row">
        <div className="col-sm-3">
          <div className="float-right">
            <Button label="Add key" style={ButtonStyle.Success} onClick={this.addKey} />
          </div>
        </div>
        {keyConfigs}
      </div>
    );
  }

  private onInputChange = (id: number, name: string, value: any) => {
    const key = this.props.config[id];
    key[name] = value;
    this.props.onChange(id.toString(), key);
  }

  private addKey = () => {
    const ids = Object.keys(this.props.config);
    const newId = ids.length > 0 ? Number(ids[ids.length - 1]) + 1 : 1;
    const newKey = {
      name: "Key " + newId,
      algorithm: DNSSECAlgorithm.HMAC_MD5,
      key: ""
    };
    this.props.onChange(newId.toString(), newKey);
  }

  private deleteKey = (id: number) => {
    this.props.onChange(id.toString(), null);
  }
}
