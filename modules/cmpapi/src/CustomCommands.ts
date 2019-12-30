export interface CustomCommands {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [commandName: string]: (callback: (...params) => void, param?: any) => void;

}
