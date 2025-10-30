export function normalizePlateRaw(input) {
  if (!input) return "";
  return String(input)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export function formatPlateDisplay(input) {
  const raw = normalizePlateRaw(input).slice(0, 7);
  if (raw.length <= 3) return raw;
  return `${raw.slice(0, 3)}-${raw.slice(3)}`;
}

export function unmaskPlate(input) {
  if (!input) return "";
  return String(input).replace(/-/g, "");
}
