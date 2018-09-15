export default interface IInputProps<T> {
  label: string;
  name: string;
  value?: T;
  // tslint:disable-next-line:no-any
  onChange?: (event: any) => void;
}
