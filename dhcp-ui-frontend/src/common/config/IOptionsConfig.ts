export interface IOptionsConfig {
  [id: number]: IOption;
}

export interface IOption {
  name: string;
  expression: string;
}