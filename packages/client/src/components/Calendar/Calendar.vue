<script setup lang="ts">
import MonthlyCalendar from './MonthlyCalendar.vue';
import WeeklyCalendar from './WeeklyCalendar.vue';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import { reactive, ref, } from 'vue';
import { formattedDate, type CurrentDate } from '@/utils/calendar';
import moment from 'moment';
import Dropdown from '../Dropdown.vue';

const now = new Date()

const curentDate = reactive<CurrentDate>({
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

const getRange = () => {
   switch (selectedView.value) {
      case 'Day':
         return TIME_RANGE.Day
      case 'Week':
         return TIME_RANGE.Week
      case 'Month':
         return TIME_RANGE.Month
   }
}

const addTime = (range: number) => {
   const date = moment([curentDate.year, curentDate.month, curentDate.day]).add(range, 'days')
   curentDate.day = date.date()
   curentDate.month = date.month()
   curentDate.year = date.year()
}

</script>

<template>
   <div class="p-4 flex gap-x-5 items-center">
      <div
         class="rounded-full cursor-pointer hover:bg-gray-50 p-2 h-10 w-10"
         @click="addTime(-getRange())"
      >
         <ChevronLeftIcon class="stroke-gray-500 stroke-2" />
      </div>

      <h1 class="text-lg">{{ formattedDate(curentDate, "MMMM yyyy") }}</h1>

      <div
         class="rounded-full cursor-pointer hover:bg-gray-50 p-2 h-10 w-10"
         @click="addTime(getRange())"
      >
         <ChevronRightIcon class="stroke-gray-500 stroke-2" />
      </div>
      <div>
         <Dropdown v-model="selectedView" :items="calendarViews"></Dropdown>
      </div>
   </div>

   <MonthlyCalendar
      v-if="selectedView === 'Month'"
      :year="curentDate.year"
      :month="curentDate.month"
   />
   <WeeklyCalendar
      v-if="selectedView === 'Week'"
      :year="curentDate.year"
      :month="curentDate.month"
      :day="curentDate.day"
   />
</template>