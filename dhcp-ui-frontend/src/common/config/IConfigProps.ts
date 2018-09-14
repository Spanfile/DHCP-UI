export type ValueOf<T> = T[keyof T];

export default interface IConfigProps<T> {
  config: T;
  onChange: (name: keyof T, value?: ValueOf<T>) => void;
}

export interface ICollectionConfigProps<T> extends IConfigProps<T> {
  onDelete: () => void;
}

export type ConfigKey = string | number;

export function handleConfigChange<T>(config: keyof T, props: IConfigProps<T>) {
  return (name: ConfigKey, value: any) => {
    const conf = props.config[config];
    if (value == null) {
      delete conf[name];
    } else {
      conf[name] = value;
    }
    props.onChange(config, conf);
  };
}
