export interface Pokemon {
  name: string;
  sprites: string;
  color: string;
}

export interface ListData<T> {
  totalData: number;
  currentPage: number;
  datas: T[];
}