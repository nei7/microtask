
<script setup lang="ts">
import { calculateTop, hourToDecimal, type Hour } from '@/utils/calendar';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import type { CalendarEvent } from '../../types/calendar'

const props = defineProps<{
   event: CalendarEvent
}>()


const calculateHeight = (period: { startHour: Hour, endHour: Hour }) => {
   const startHour = hourToDecimal(period.startHour)
   const endHour = hourToDecimal(period.endHour)

   return (endHour - startHour) * 44
}

const height = ref(calculateHeight(props.event.period))
const top = ref(calculateTop(props.event.period.startHour))
const eventRef = ref<HTMLDivElement>()

onMounted(() => {
   const resize = (mouse_y: number, original_height: number) => (e: MouseEvent) => {
      height.value = original_height + (e.pageY - mouse_y);
   }

   eventRef.value?.addEventListener("mousedown", (e: MouseEvent) => {
      e.preventDefault()
      console.log(e)
      if (e.offsetY > eventRef.value!.clientHeight - 6) {
         const original_height = parseFloat(getComputedStyle(eventRef.value!, null).getPropertyValue('height').replace('px', ''));

         const r = resize(e.pageY, original_height)
         window.addEventListener("mousemove", r);

         window.addEventListener("mouseup", () => window.removeEventListener("mousemove", r));
      }
   }, false);


})


</script>

<template>
   <div
      :class="event.color"
      class="absolute rounded-lg shadow-xl p-3 ml-5 text-white calendar-event"
      ref="eventRef"
      :style="{ height: `${height}px`, top: `${top}px` }"
      style="width: calc(100% - 2rem);"
   >
      <h1 class="text-md font-medium">{{ event.name }}</h1>
      <p class="text-sm">
         {{ `${moment(event.period.startHour.unix).format('hh:mm - ')}` }}
         {{ `${moment(event.period.endHour.unix).format('hh:mm A')}` }}
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

