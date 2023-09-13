export interface IDate {
  year: string;
  month: string;
  day: string;
}

export const getDateAsString = (date: Date | IDate | string): string => {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  if (typeof date === 'string') {
    return date;
  }
  return `${date.year}-${date.month}-${date.day}`;
};
