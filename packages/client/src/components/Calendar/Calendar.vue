<script setup lang="ts">
import Dropdown from '../Dropdown.vue';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import { reactive, ref, } from 'vue';
import { formattedDate, } from '@/utils/calendar';
import moment from 'moment';
import router from '@/router';
import { useRoute } from 'vue-router';

import type { TimeDay } from '@/types/calendar';
import CreateEvent from './CreateEvent.vue';

const now = new Date()

const currentDate = reactive<TimeDay>({
   year: now.getFullYear(),
   month: now.getMonth(),
   day: now.getDate(),
})


type Time = 'day' | 'week' | 'month'

function push(this: { name: string }) {
   router.push('/calendar/' + this.name)
}
const calendarViews: { name: Time, onclick: () => void }[] = [
   {
      name: 'day',
      onclick: push
   },
   {
      name: 'week',
      onclick: push
   },
   {
      name: 'month',
      onclick: push
   }
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

   <CreateEvent></CreateEvent>
</template>