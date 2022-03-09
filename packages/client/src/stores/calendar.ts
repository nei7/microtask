import type { CalendarEvent, TimeDay } from '@/types/calendar';
import { defineStore } from 'pinia';

type State = {
   events: CalendarEvent[];
};

export const useCalendarStore = defineStore({
   id: 'calendar',
   state: (): State => ({
      events: [],
   }),
   actions: {
      getEvents(date: TimeDay): CalendarEvent[] {
         return this.events.filter((event) => {
            if (
               event.period.day === date.day &&
               event.period.month === date.month &&
               event.period.year === date.year
            )
               return true;
         });
      },
      getEvent(id: string): CalendarEvent | undefined {
         return this.events.find((event) => event._id === id);
      },
      remove(id: string) {
         this.events = this.events.filter((event) => event._id !== id);
      },
   },
});
