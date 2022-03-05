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
   <div class="border-t w-full">
      <Day :date="moment([date.year, date.month, date.day])" :show-hour="true" format="Day"></Day>
   </div>
</template>