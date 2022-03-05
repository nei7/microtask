<script setup lang="ts">
import type { CalendarEvent } from '@/types/calendar'
import { calculateTop } from '@/utils/calendar'
import type { Moment } from 'moment'
import moment from 'moment'
import Event from './CalendarEvent.vue'

defineProps<{
   date: Moment
   format: 'Week' | 'Day'
}>()

const events: CalendarEvent[] = [{
   name: "JD",
   period: {
      startHour: {
         hour: 9,
         minute: 20,
         unix: Date.now()
      },
      endHour: {
         hour: 12,
         minute: 40,
         unix: moment().add(2, 'hours').unix(),
      },
   },
   description: "wyrzuć śmieci",
   color: 'bg-blue-500'
}]

const now = moment()
console.log(now.minute())


</script>

<template>
   <div class="w-full">
      <div class="flex">
         <div style="margin-top: 3.5rem;" v-if="date.day() === 0 || format === 'Day'">
            <div class="flex" v-for="hour in 24">
               <span
                  class="text-xs text-gray-500 w-16 mr-2 h-11 text-right"
               >{{ !(hour % 12) ? 12 : hour % 12 }} {{ hour > 12 ? 'PM' : 'AM' }}</span>
            </div>
         </div>
         <div class="w-full relative" :class="format === 'Week' && ['w-64']">
            <div class="absolute w-full h-full" role="presentation">
               <div class="w-px bg-gray-200 ml-3" style="height: calc(2.75rem * 24)"></div>
               <div
                  v-if="now.isSame(date, 'day')"
                  class="h-1 bg-blue-400 rounded-lg w-full absolute"
                  :style="{ top: `${calculateTop({ hour: now.hour(), minute: now.minute() })}px` }"
               ></div>

               <Event v-for="event in events" :event="event"></Event>
            </div>
            <div
               class="ml-5 mb-5 mt-3 text-gray-500 text-sm font-medium px-2.5 py-0.5 rounded"
               :class="date.isSame(moment(), 'day') && ['bg-blue-100', 'text-blue-800']"
            >{{ date.format("ddd - DD") }}</div>
            <div class="border-t">
               <div v-for="hour in 24" class="w-full h-11 border-b border-gray-200"></div>
            </div>
         </div>
      </div>
   </div>
</template>