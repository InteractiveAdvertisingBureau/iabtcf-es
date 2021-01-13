declare namespace NodeJS {
  interface Global {
    btoa: (str: string | Buffer) => string;
    atob: (str: string) => string;
  }
}
