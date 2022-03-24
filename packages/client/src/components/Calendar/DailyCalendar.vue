<script setup lang="ts">
import Day from "./Day.vue";
import moment from "moment";

const props = defineProps<{
   date: {
      year: number,
      month: number,
      day: number
   },
}>();
</script>

<template>
   <div class="overflow-x-hidden" style="height: calc(100vh - 9rem);" id="day-container">
      <div class="w-full border-t border-r border-gray-200 flex box-content h-screen">
         <Day :date="moment([date.year, date.month, date.day])" :show-hour="true" format="Day"></Day>
      </div>
   </div>
</template>