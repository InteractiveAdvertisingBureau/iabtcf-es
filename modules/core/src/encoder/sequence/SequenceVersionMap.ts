export interface SVMItem {
  [label: string]: string[];
}
export interface SequenceVersionMap {
  '1': string[] | SVMItem ;
  '2': string[] | SVMItem ;
}
