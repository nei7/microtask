<script setup lang="ts">
import Dropdown from '../Dropdown.vue';

import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import { reactive, ref, } from 'vue';
import { formattedDate, type CurrentDate } from '@/utils/calendar';
import moment from 'moment';
import router from '@/router';
import { useRoute } from 'vue-router';


const now = new Date()

const currentDate = reactive<CurrentDate>({
   year: now.getFullYear(),
   month: now.getMonth(),
   day: now.getDay() - 1,
})


type Time = 'day' | 'week' | 'month'

const calendarViews: { name: Time, onclick: () => void }[] = [
   { name: 'day', onclick: () => router.push('/calendar/day') },
   { name: 'week', onclick: () => router.push('/calendar/week') },
   { name: 'month', onclick: () => router.push('/calendar/month') }
]
const route = useRoute()

const selectedView = ref<Time>(route.name?.toString() as Time)

const TIME_RANGE = {
   day: 1,
   week: 7,
   month: 30
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
         class="rounded-full cursor-pointer hover:bg-gray-100 p-2 h-10 w-10"
         @click="addTime(-TIME_RANGE[selectedView])"
      >
         <ChevronLeftIcon class="stroke-gray-500 stroke-2" />
      </div>

      <h1 class="text-md">{{ formattedDate(currentDate, "MMMM yyyy") }}</h1>

      <div
         class="rounded-full cursor-pointer hover:bg-gray-100 p-2 h-10 w-10"
         @click="addTime(TIME_RANGE[selectedView])"
      >
         <ChevronRightIcon class="stroke-gray-500 stroke-2" />
      </div>
      <div>
         <Dropdown v-model="selectedView" :items="calendarViews"></Dropdown>
      </div>
   </div>
   <router-view v-slot="{ Component }">
      <component :is="Component" :date="currentDate" />
   </router-view>
</template>