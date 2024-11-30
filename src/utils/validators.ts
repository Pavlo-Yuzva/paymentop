export function isValidAge(age: number): boolean {
  return typeof age === 'number' && age >= 1 && age <= 100;
}

export function isString(value: unknown): boolean {
  return typeof value === 'string';
}
