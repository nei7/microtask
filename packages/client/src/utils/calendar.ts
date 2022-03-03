import moment from "moment";

export type CurrentDate = {
  year: number;
  month: number;
  day: number;
};

export const getWeekDay = ({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}) => moment(Date.UTC(year, month, day)).format("dddd");

export const daysInMonth = (date: Date) => date.getDate();

export const formattedDate = (
  { day, month, year }: CurrentDate,
  format: string
) => moment(Date.UTC(year, month, day)).format(format);

export const unixFromTime = (year: number, month: number, day: number) =>
  Date.UTC(year, month, day);
