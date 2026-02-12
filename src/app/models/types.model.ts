export interface Dictionary<T> {
  [key: string]: T;
}

export enum COL_TYPE {
  TEXT,
  NUMBER,
  CURRENCY,
  DATE,
}
