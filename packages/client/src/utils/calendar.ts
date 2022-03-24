import type { TimeDay } from '@/types/calendar';
import moment from 'moment';

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

export const formattedDate = ({ day, month, year }: TimeDay, format: string) =>
   moment(Date.UTC(year, month, day)).format(format);

export type Hour = { hour: number; minute: number };

export const hourToDecimal = (hour: Hour): number =>
   hour.minute / 60 + hour.hour;

export const decimalToHour = (time: number): Hour => {
   const [hourString, minuteString] = `${time}`.split('.');
   let minute = Math.round(Number(`0.${minuteString}`) * 60) || 0;
   let hour = +hourString + 1;
   if (minute === 60) {
      hour++;
      minute = 0;
   }

   return {
      hour: hour - 1,
      minute,
   };
};

export const calculateTop = (startDate: Hour) =>
   hourToDecimal(startDate) * calendarConfig.tile;

export const formatHour = (hour: Hour): string => {
   return `${('0' + hour.hour).slice(-2)}:${('0' + hour.minute).slice(-2)}`;
};
