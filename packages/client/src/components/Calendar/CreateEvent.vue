<script setup lang="ts">
import useEvent from '@/composables/useEvent';
import Input from '../Input.vue';
import Button from '../Button.vue';
import Datepicker from '../Datepicker.vue';
import { parseDate, parseHour } from '@/utils/calendarEvent';

const { eventData, updateEvent, show, deleteEvent, selectedEvent } = useEvent()


const update = () => {
   const startHour = parseHour(eventData.startHour);
   const endHour = parseHour(eventData.endHour);
   const { month, year, day } = parseDate(eventData.date);

   updateEvent(selectedEvent.value?._id || '', {
      name: eventData.title,
      description: eventData.description,
      period: {
         year,
         month,
         day,
         startHour,
         endHour
      }
   })

}
</script>

<template>
   <div
      v-if="show"
      class="absolute bg-white bottom-0 z-50 p-6 mx-7 shadow-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] mb-2 rounded-lg"
      style="width: calc(100% - 4rem)"
   >
      <div class="w-full flex justify-end -mt-3">
         <button
            @click="show = false"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
         >
            <svg
               class="w-5 h-5"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
               />
            </svg>
         </button>
      </div>
      <div class="mb-6">
         <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Event time</label>

         <div class="flex gap-x-3 items-center text-xl">
            <Datepicker v-model="eventData.startHour" type="time" />-
            <Datepicker v-model="eventData.endHour" type="time" />

            <Datepicker v-model="eventData.date" type="date" />
         </div>
      </div>
      <div class="mb-6">
         <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
         >Event title</label>
         <input
            v-model="eventData.title"
            type="text"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required
         />
      </div>
      <div class="mb-6">
         <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
         >Event description</label>
         <textarea
            v-model="eventData.description"
            id="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your description here..."
         ></textarea>
      </div>
      <div class="mb-6">
         <!-- <input
               type="color"
               value="#e66465"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         />-->
      </div>
      <div class="flex gap-x-2">
         <Button @click="update" text="Submit"></Button>
         <Button @click="deleteEvent" text="Delete" class="bg-red-500"></Button>
      </div>
   </div>
</template>