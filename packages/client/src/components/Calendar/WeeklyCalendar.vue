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
   const now = moment([year, month, day])

   for (let i = 0; i < 7; i++) {
      arr[i] = moment([year, month, day]).add(now.day() - (now.day() - i + 1), 'days')
   }
   return arr
})

</script>

<template>
   <div class="overflow-x-auto overflow-x-hidden" style="height: calc(100vh - 9rem);">
      <div class="w-full border-t border-r border-gray-200 flex box-content h-screen">
         <div v-for="day in days" class="w-full">
            <Day
               :date="day"
               :show-hour="day.day() === 4"
               :class="{ 'w-80': day.day() === 4 }"
               class="w-64"
            ></Day>
         </div>
      </div>
   </div>
</template>


