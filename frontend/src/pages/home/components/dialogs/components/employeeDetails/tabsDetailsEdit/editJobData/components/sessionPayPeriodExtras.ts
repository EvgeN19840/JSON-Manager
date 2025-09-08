
export const sessionPayPeriodExtras = new Set<string>();

export const addPayPeriodExtra = (v?: string) => {
  const s = (v ?? '').toString().trim();
  if (s) sessionPayPeriodExtras.add(s);
};
