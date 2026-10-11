export function toBengaliNumber(num: number | string): string {
  const bnDigits: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
    ".": ".",
  };

  // Format numbers with commas (e.g. 1250 -> 1,250)
  const formatted = typeof num === "number" ? num.toLocaleString("en-US") : num;

  return formatted
    .toString()
    .split("")
    .map((char) => bnDigits[char] || char)
    .join("");
}

export function formatUnitBn(unit?: string): string {
  if (!unit) return "";

  const unitMap: { [key: string]: string } = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
    gram: "গ্রাম",
  };

  const lowerUnit = unit.toLowerCase().trim();
  return unitMap[lowerUnit] || unit;
}
