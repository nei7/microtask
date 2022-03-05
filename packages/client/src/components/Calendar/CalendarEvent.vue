
<script setup lang="ts">
import { calculateTop, decimalToHour, hourToDecimal, type Hour, calendarConfig } from '@/utils/calendar';
import { computed, onMounted, ref } from 'vue';
import type { CalendarEvent } from '../../types/calendar'

const props = defineProps<{
   event: CalendarEvent
}>()


const calculateHeight = (period: { startHour: Hour, endHour: Hour }) => {
   const startHour = hourToDecimal(period.startHour)
   const endHour = hourToDecimal(period.endHour)

   return (endHour - startHour) * calendarConfig.tile
}

const height = ref(calculateHeight(props.event.period))
const top = ref(calculateTop(props.event.period.startHour))
const eventRef = ref<HTMLDivElement>()


const hours = computed<{ startHour: Hour, endHour: Hour }>(() => {
   const diff = height.value / calendarConfig.tile
   const startHour = (top.value) / calendarConfig.tile
   const endHour = diff + startHour


   return {
      startHour: decimalToHour(startHour),
      endHour: decimalToHour(endHour)
   }
})

onMounted(() => {
   let offsetY = 0;
   const resize = (mouse_y: number, original_height: number) => (e: MouseEvent) => {
      const calculatedHeight = original_height + (e.pageY - mouse_y);
      if (calculatedHeight < eventRef.value!.parentElement!.clientHeight - top.value - 44 - 1.8) {
         height.value = calculatedHeight
      }
   }
   const move = (e: MouseEvent) => {
      const dy = e.clientY - offsetY

      if (dy > -1 && eventRef.value!.parentElement!.clientHeight - height.value - 46 > dy) {
         top.value = e.clientY - offsetY
      }
   }

   eventRef.value?.addEventListener("mousedown", (e: MouseEvent) => {
      const original_height = eventRef.value!.clientHeight

      if (e.offsetY > eventRef.value!.clientHeight - 10) {
         const resizeCallback = resize(e.pageY, original_height)
         window.addEventListener("mousemove", resizeCallback);

         window.addEventListener("mouseup", () => window.removeEventListener("mousemove", resizeCallback));
      } else {
         offsetY = e.y - eventRef.value!.offsetTop
         window.addEventListener("mousemove", move);

         window.addEventListener("mouseup", () => window.removeEventListener("mousemove", move));
      }
   }, false);
})


</script>

<template>
   <div
      :class="event.color"
      class="absolute rounded-md shadow-xl p-3 ml-5 text-white select-none calendar-event"
      ref="eventRef"
      :style="{ height: `${height}px`, top: `${top}px` }"
      style="width: calc(100% - 2rem);"
   >
      <h1 class="text-md font-medium">{{ event.name }}</h1>
      <p class="text-sm">
         {{ `${hours.startHour.hour}:${hours.startHour.minute}` }} -
         {{ `${hours.endHour.hour}:${hours.endHour.minute}` }}
      </p>
   </div>
</template>

<style>
.calendar-event::after {
   content: "";
   position: absolute;
   bottom: 0;
   width: 100%;
   height: 6px;
   cursor: row-resize;
}
</style>

