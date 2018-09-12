export interface IConfigProps<T> {
  config: T;
  onChange: (name: keyof T, value: any) => void;
}

export interface ICollectionConfigProps<T> extends IConfigProps<T> {
  onDelete: () => void;
}