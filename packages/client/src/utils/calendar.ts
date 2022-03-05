import moment, { min } from 'moment';

export type CurrentDate = {
   year: number;
   month: number;
   day: number;
};

export const calendarConfig = {
   tile: 44,
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

export const hourToDecimal = (hour: Hour): number =>
   hour.minute / 60 + (hour.hour - 1);

export const decimalToHour = (time: number): Hour => {
   const [hourString, minuteString] = `${time}`.split('.');

   let minute = Math.round(Number(`0.${minuteString}`) * 60) || 0;
   let hour = +hourString + 1;
   if (minute === 60) {
      hour++;
      minute = 0;
   }

   return {
      hour,
      minute,
   };
};

export const calculateTop = (startDate: Hour) =>
   hourToDecimal(startDate) * calendarConfig.tile;
