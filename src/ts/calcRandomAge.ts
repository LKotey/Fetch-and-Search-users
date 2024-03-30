function randomInteger(min: number, max: number) {
  let res = min + Math.random() * (max + 1 - min);
  return Math.floor(res);
}

export { randomInteger };
