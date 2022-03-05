import moment from 'moment';

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
}) => moment(Date.UTC(year, month, day)).format('dddd');

export const formattedDate = (
   { day, month, year }: CurrentDate,
   format: string,
) => moment(Date.UTC(year, month, day)).format(format);

export type Hour = { hour: number; minute: number };

export const hourToDecimal = (hour: Hour) => hour.minute / 60 + (hour.hour - 1);

export const calculateTop = (startDate: Hour) =>
   hourToDecimal(startDate) * 44 + 56;
