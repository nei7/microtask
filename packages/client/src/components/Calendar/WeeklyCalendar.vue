<script setup lang="ts">
import moment from 'moment';
import { computed } from 'vue';
import Day from './Day.vue';

const props = defineProps<{
   year: number,
   month: number,
   day: number,
}>();


const days = computed(() => {
   const arr = []
   const now = moment([props.year, props.month, props.day])

   for (let i = 0; i < 7; i++) {
      arr[i] = moment([props.year, props.month, props.day]).add(now.day() - (now.day() - i + 1), 'days')
   }
   return arr
})

</script>

<template>
   <div class="overflow-x-auto overflow-x-hidden" style="height: calc(100vh - 9rem);">
      <div class="w-full border-t border-r border-gray-200 flex box-content h-screen">
         <div class="w-20" style="margin-top:4.75rem">
            <p v-for="i in 24" class="max-h-14 w-full text-center border-t py-4">{{ i % 24 }}:00</p>
         </div>
         <div v-for="day in days" class="w-1/6">
            <div class="border-b border-l text-center p-3">
               <div
                  :class="day.isSame(moment(), 'day') && ['bg-blue-100 text-blue-800', 'dark:bg-blue-200']"
                  class="rounded"
               >
                  <p
                     class="text-sm font-medium py-0.5"
                     :class="{ 'text-gray-600': day.month() !== month }"
                  >{{ day.format("ddd") }}</p>
               </div>
               <h3
                  class="font-medium text-xl"
                  :class="{ 'text-gray-400': day.month() !== month }"
               >{{ day.date() }}</h3>
            </div>
            <Day></Day>
         </div>
      </div>
   </div>
</template>


