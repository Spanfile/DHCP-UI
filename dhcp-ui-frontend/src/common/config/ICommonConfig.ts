export interface IConfigCollection<T> {
  [id: number]: T;
}

export interface ICommonConfig<T> {
  common: T;
}
