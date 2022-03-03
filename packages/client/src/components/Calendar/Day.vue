<script setup lang="ts">
import type { Moment } from 'moment'


defineProps<{
   date: Moment
   showHour: boolean
}>()

const tasks = [{
   name: "JD",
   period: {
      startHour: {
         hour: 9,
         minute: 20
      },
      endHour: {
         hour: 12,
         minute: 40
      },
   },
   description: "wyrzuć śmieci",
   color: 'bg-blue-500'
}]


type Hour = { hour: number, minute: number }

const hourToDecimal = (hour: Hour) => ((hour.minute) / 60) + (hour.hour - 1)

const calculateTop = (startDate: Hour) =>
   `${(hourToDecimal(startDate)) * 2.75}rem`


const calculateEnd = (period: { startHour: Hour, endHour: Hour }) => {
   const startHour = hourToDecimal(period.startHour)
   const endHour = hourToDecimal(period.endHour)

   return `${(endHour - startHour) * 2.75}rem`
}

</script>

<template>
   <div class="w-full">
      <div class="flex">
         <div style="margin-top: 2.2rem;" v-if="showHour">
            <div class="flex" v-for="hour in 24">
               <span
                  class="text-xs text-gray-500 w-16 mr-2 h-11 text-right"
               >{{ !(hour % 12) ? 12 : hour % 12 }} {{ hour > 12 ? 'PM' : 'AM' }}</span>
            </div>
         </div>
         <div class="w-full relative">
            <div class="absolute w-full h-full" role="presentation">
               <div class="w-px bg-gray-200 ml-3" style="height: calc(2.75rem * 24)"></div>
               <div
                  v-for="task in tasks"
                  :style="{ top: calculateTop(task.period.startHour) }"
                  class="w-full absolute pl-5 pr-4"
               >
                  <div
                     :class="task.color"
                     class="rounded-lg shadow-xl p-3 text-white"
                     :style="{ height: calculateEnd(task.period) }"
                  >
                     <h1 class="text-md font-medium">{{ task.name }}</h1>
                     <p>
                        {{ `${task.period.startHour.hour}:${task.period.startHour.minute}` }} -
                        {{ `${task.period.endHour.hour}:${task.period.endHour.minute}` }}
                     </p>
                  </div>
               </div>
            </div>
            <div>
               <div
                  class="w-full h-11 border-b border-gray-200 text-center pt-2 text-sm"
               >{{ date.format("ddd - D") }}</div>
               <div v-for="hour in 24" class="w-full h-11 border-b border-gray-200"></div>
            </div>
         </div>
      </div>
   </div>
</template>