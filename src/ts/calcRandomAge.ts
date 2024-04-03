function randomInteger(min: number, max: number): number {
  let res = min + Math.random() * (max + 1 - min);
  return Math.floor(res);
}

export { randomInteger };
