export default interface IInputProps<T> {
  label: string;
  name: string;
  value?: T;
  onChange?: (event: any) => void;
}
