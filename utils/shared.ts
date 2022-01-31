export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function capitalizeFirstLetter(string: string): string {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}