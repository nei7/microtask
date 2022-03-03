<script setup lang="ts">
import { computed, toRefs } from 'vue';
import moment from 'moment';

const props = defineProps<{
   date: {
      year: number,
      month: number,
      day: number
   },
}>();



const days = computed(() => {
   const { year, month } = props.date

   const arr = []
   for (let i = 0; i < 35; i++) {
      arr.push(moment([year, month, 1]).add(i, 'days'))
   }
   return arr
})

</script>

<template>
   <div class="overflow-auto">
      <div class="min-w-full">
         <div
            style="height: calc(100vh - 9rem);"
            class="shadow-md sm:rounded-lg grid grid-cols-7 border-t border-gray-200"
         >
            <div
               v-for="day in days"
               :class="{ 'text-gray-400': day.month() !== date.month }"
               class="text-gray-700text-sm font-medium text-center dark:text-white border-b border-r cursor-pointer px-5 pb-5 pt-2"
            >
               <p
                  :class="day.isSame(moment(), 'day') && ['bg-blue-100 text-blue-800']"
                  class="mx-auto text-sm font-medium py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
               >{{ day.format('dddd') }}</p>

               <p class="text-gray-500">{{ day.date() }}</p>
            </div>
         </div>
      </div>
   </div>
</template>


