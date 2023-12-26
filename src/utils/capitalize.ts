export function capitalizeFirstLetter(input: string): string {
  if (input.length === 0) {
    return input; // Handle empty string
  }

  const firstLetter = input[0].toUpperCase();
  const restOfString = input.slice(1);

  return firstLetter + restOfString;
}
