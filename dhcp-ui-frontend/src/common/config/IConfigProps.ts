export default interface IConfigProps<T> {
  config: T;
  onChange: (name: string, value: any) => void;
}
