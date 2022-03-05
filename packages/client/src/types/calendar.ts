export interface CalendarEvent {
   name: string;
   description: string;
   color: string;
   period: {
      startHour: {
         hour: number;
         minute: number;
         unix: number;
      };
      endHour: {
         hour: number;
         minute: number;
         unix: number;
      };
   };
}
