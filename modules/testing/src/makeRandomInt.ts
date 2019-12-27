export function makeRandomInt(betweenStart: number, betweenEnd: number): number {

  return Math.round(Math.random() * (betweenEnd - betweenStart)) + betweenStart;

}
