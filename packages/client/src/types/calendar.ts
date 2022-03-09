type Color = 'blue' | 'red' | 'purple' | 'indigo' | 'green';
type ColorValue =
   | '100'
   | '200'
   | '300'
   | '400'
   | '500'
   | '600'
   | '700'
   | '800'
   | '900';

export interface CalendarEvent {
   _id: string;

   name: string;
   description: string;
   color: `${Color}-${ColorValue}`;
   period: {
      month: number;
      year: number;
      day: number;
      startHour: {
         hour: number;
         minute: number;
      };
      endHour: {
         hour: number;
         minute: number;
      };
   };
}

export type TimeDay = {
   year: number;
   month: number;
   day: number;
};
