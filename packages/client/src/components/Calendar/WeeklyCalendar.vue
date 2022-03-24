<script setup lang="ts">
import moment from 'moment';
import { computed } from 'vue';
import Day from './Day.vue';

const props = defineProps<{
   date: {
      year: number,
      month: number,
      day: number
   },
}>();


const days = computed(() => {
   const { year, month, day } = props.date

   const arr = []
   const currDate = moment([year, month, day])

   for (let i = 0; i < 7; i++) {
      const daysBack = currDate.day() - i
      arr[i] = moment([year, month, day]).subtract(daysBack > 0 ? daysBack : daysBack === 0 ? 0 : (daysBack), 'days')
   }
   return arr
})

</script>

<template>
   <div class="overflow-x-hidden" style="height: calc(100vh - 9rem);" id="day-container">
      <div class="w-full border-t border-r border-gray-200 flex box-content h-screen">
         <Day v-for="day in days" :date="day" format="Week"></Day>
      </div>
   </div>
</template>


