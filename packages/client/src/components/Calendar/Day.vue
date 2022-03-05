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
</script>

<template>
   <div class="w-full">
      <div
         class="w-full border-l ml-3 p-2 pr-5"
         :style="date.day() === 0 || format === 'Day' ? { 'margin-left': '5.251rem' } : {}"
      >
         <div
            class="text-gray-500 text-sm font-medium px-2.5 py-0.5 rounded"
            :class="date.isSame(moment(), 'day') && ['bg-blue-100', 'text-blue-800']"
            style="width: calc(100% - 4rem);"
         >{{ date.format("ddd - DD") }}</div>
      </div>
      <div class="flex">
         <div style="margin-top: -0.4rem;" v-if="date.day() === 0 || format === 'Day'">
            <div class="flex" v-for="hour in 24">
               <span
                  class="text-xs text-gray-500 w-16 mr-2 h-11 text-right"
               >{{ !(hour % 12) ? 12 : hour % 12 }} {{ hour > 12 ? 'PM' : 'AM' }}</span>
            </div>
         </div>
         <div class="w-full relative overflow-auto" :class="format === 'Week' && ['w-64']">
            <div class="absolute w-full h-full" role="presentation">
               <div class="w-px bg-gray-200 ml-3" style="height: calc(2.75rem * 24)"></div>
               <div
                  v-if="now.isSame(date, 'day')"
                  class="h-1 bg-blue-400 rounded-lg w-full absolute ml-3"
                  :style="{ top: `${calculateTop({ hour: now.hour(), minute: now.minute() })}px` }"
               ></div>

               <Event v-for="event in events" :event="event"></Event>
            </div>

            <div class="border-t">
               <div v-for="hour in 24" class="w-full h-11 border-b border-gray-200"></div>
               <div class="h-11"></div>
            </div>
         </div>
      </div>
   </div>
</template>