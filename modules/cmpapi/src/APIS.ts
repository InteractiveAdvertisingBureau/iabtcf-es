
/* eslint-disable-next-line */
export type apiMethod = (callback: Function, param?: any) => void; 

export interface APIS {

  [methodName: string]: apiMethod;
}
