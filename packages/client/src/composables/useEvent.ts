import { useCalendarStore } from '@/stores/calendar';
import type { CalendarEvent } from '@/types/calendar';
import { parseHour, parseDate, formatDate } from '@/utils/calendarEvent';
import mitt from 'mitt';
import { ref, reactive } from 'vue';
import { v4 } from 'uuid';
import { formatHour, type Hour } from '@/utils/calendar';

export type Events = {
   created: string;
   updated: CalendarEvent;
   deleted: string;
};

export const emmiter = mitt<Events>();

type EventData = {
   title: string;
   description: string;
   date: string;
   startHour: string;
   endHour: string;
};

export default function useEvent() {
   const store = useCalendarStore();

   const show = ref(false);
   const selectedEvent = ref<CalendarEvent | undefined>();

   const eventData = reactive<EventData>({
      title: '',
      description: '',
      date: '',
      startHour: '',
      endHour: '',
   });

   emmiter.on('created', (eventId) => {
      show.value = true;

      const event = store.getEvent(eventId);
      if (event) {
         eventData.startHour = formatHour(event.period.startHour);
         eventData.endHour = formatHour(event.period.endHour);
         eventData.date = formatDate(event.period);
         eventData.description = event.description;
         eventData.title = event.name;

         selectedEvent.value = event;
      }
   });

   const updateEvent = (
      id: string,
      { name, period, description }: Omit<CalendarEvent, '_id' | 'color'>,
   ) => {
      const event: CalendarEvent = {
         _id: v4(),
         name,
         description,
         color: 'blue-100',
         period,
      };
      const foundEvent = store.$state.events.find((event) => event._id === id);

      if (foundEvent) {
         foundEvent.description = event.description;
         foundEvent.period = event.period;
         foundEvent.name = event.name;

         emmiter.emit('updated', foundEvent);
      }
   };

   const deleteEvent = () => {
      if (selectedEvent.value) {
         store.remove(selectedEvent.value._id);
         emmiter.emit('deleted', selectedEvent.value._id);
         show.value = false;
      }
   };

   return {
      emmiter,
      eventData,
      selectedEvent,
      updateEvent,
      show,
      deleteEvent,
   };
}
