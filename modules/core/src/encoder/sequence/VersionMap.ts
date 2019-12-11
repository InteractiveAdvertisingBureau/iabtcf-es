export interface VMItem {
  [label: string]: string[];
}
export interface VersionMap {
  '1': string[] | VMItem ;
  '2': string[] | VMItem ;
}
