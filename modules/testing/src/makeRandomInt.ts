export function makeRandomInt(betweenStart: number, betweenEnd: number): number {

  return betweenStart + Math.floor(Math.random() * (betweenEnd - 1));

}
