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
      const daysBack = now.day() - i
      console.log(i, now.day(), daysBack)
      arr[i] = moment([year, month, day]).subtract(daysBack > 0 ? daysBack : daysBack === 0 ? 0 : (daysBack), 'days')
   }
   return arr
})

</script>

<template>
   <div class="overflow-x-auto overflow-x-hidden" style="height: calc(100vh - 9rem);">
      <div class="w-full border-t border-r border-gray-200 flex box-content h-screen">
         <div v-for="day in days" class="w-full">
            <Day :date="day" format="Week"></Day>
         </div>
      </div>
   </div>
</template>


