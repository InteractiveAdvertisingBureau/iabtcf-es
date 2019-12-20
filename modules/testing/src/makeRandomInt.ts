export function makeRandomInt(betweenStart: number, betweenEnd: number): number {

  return Math.floor(Math.random() * (betweenEnd - betweenStart)) + betweenStart;

}
