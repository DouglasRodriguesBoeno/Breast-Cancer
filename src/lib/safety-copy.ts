const safetyCopyReplacements = [
  {
    pattern: /provavelmente\s+n[aã]o\s+(?:é\s+)?perigoso/gi,
    replacement: "descrito de forma educacional no texto do laudo",
  },
  {
    pattern: /n[aã]o\s+(?:é\s+)?perigoso/gi,
    replacement: "descrito de forma educacional no texto do laudo",
  },
  {
    pattern: /menor(?:es)?\s+chance(?:s)?\s+de\s+malignidade/gi,
    replacement:
      "menor compatibilidade com critérios técnicos do modelo educacional",
  },
];

export function sanitizeSafetyCopy(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return safetyCopyReplacements.reduce(
    (currentValue, replacement) =>
      currentValue.replace(replacement.pattern, replacement.replacement),
    value
  );
}
