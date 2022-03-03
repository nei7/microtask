<script setup lang="ts">
import MonthlyCalendar from './MonthlyCalendar.vue';
import WeeklyCalendar from './WeeklyCalendar.vue';
import DailyCalendar from './DailyCalendar.vue';
import Dropdown from '../Dropdown.vue';

import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import { reactive, ref, } from 'vue';
import { formattedDate, type CurrentDate } from '@/utils/calendar';
import moment from 'moment';


const now = new Date()

const currentDate = reactive<CurrentDate>({
   year: now.getFullYear(),
   month: now.getMonth(),
   day: now.getDay(),
})


type Time = 'Day' | 'Week' | 'Month'

const calendarViews: Time[] = ['Day', 'Week', 'Month']
const selectedView = ref<Time>('Month')

const TIME_RANGE = {
   Day: 1,
   Week: 7,
   Month: 30
}

const addTime = (range: number) => {
   const date = moment([currentDate.year, currentDate.month, currentDate.day]).add(range, 'days')
   currentDate.day = date.date()
   currentDate.month = date.month()
   currentDate.year = date.year()
}

</script>

<template>
   <div class="p-4 flex gap-x-5 items-center">
      <div
         class="rounded-full cursor-pointer hover:bg-gray-50 p-2 h-10 w-10"
         @click="addTime(-TIME_RANGE[selectedView])"
      >
         <ChevronLeftIcon class="stroke-gray-500 stroke-2" />
      </div>

      <h1 class="text-lg">{{ formattedDate(currentDate, "MMMM yyyy") }}</h1>

      <div
         class="rounded-full cursor-pointer hover:bg-gray-50 p-2 h-10 w-10"
         @click="addTime(TIME_RANGE[selectedView])"
      >
         <ChevronRightIcon class="stroke-gray-500 stroke-2" />
      </div>
      <div>
         <Dropdown v-model="selectedView" :items="calendarViews"></Dropdown>
      </div>
   </div>

   <MonthlyCalendar v-if="selectedView === 'Month'" :date="currentDate" />
   <WeeklyCalendar v-if="selectedView === 'Week'" :date="currentDate" />
   <DailyCalendar v-if="selectedView === 'Day'" :date="currentDate"></DailyCalendar>
</template>