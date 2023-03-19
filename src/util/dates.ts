const oneDay = 24 * 60 * 60 * 1000;

export function compareDatesOrNull(
  firstDate: Date | undefined,
  secondDate: Date | undefined
): number {
  if (firstDate === undefined && secondDate === undefined) {
    return 0;
  }
  if (firstDate === undefined) {
    return 1;
  }
  if (secondDate === undefined) {
    return -1;
  }
  return firstDate.getTime() - secondDate.getTime();
}

export function diffDateToday(date: Date): number {
  const today = new Date();

  const diffDays = Math.round(
    Math.abs((today.getTime() - date.getTime()) / oneDay)
  );
  return diffDays;
}

export function daysUntilFounding(founding: Date): number {
  const today = new Date();
  const currentYear = today.getFullYear();

  founding.setFullYear(currentYear);
  if (founding < today) {
    founding.setFullYear(currentYear + 1);
  }

  const days = (founding.getTime() - today.getTime()) / oneDay;

  return Math.floor(days);
}