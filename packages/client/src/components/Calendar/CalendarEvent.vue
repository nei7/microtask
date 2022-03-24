
<script setup lang="ts">
import useEvent from '@/composables/useEvent';
import { calculateTop, decimalToHour, hourToDecimal, type Hour, calendarConfig, formatHour } from '@/utils/calendar';
import { computed, onMounted, ref, watch } from 'vue';
import type { CalendarEvent } from '../../types/calendar'

const props = defineProps<{
   event: CalendarEvent
}>()

const { updateEvent } = useEvent()
const isDrag = ref(false)

const calculateHeight = (period: { startHour: Hour, endHour: Hour }) => {
   const startHour = hourToDecimal(period.startHour)
   const endHour = hourToDecimal(period.endHour)

   return (endHour - startHour) * calendarConfig.tile
}

const height = ref(calculateHeight(props.event.period))
const top = ref(calculateTop(props.event.period.startHour))
const eventRef = ref<HTMLDivElement>()

watch(() => props.event.period, () => {
   height.value = calculateHeight(props.event.period)
   top.value = calculateTop(props.event.period.startHour)
})

const hours = computed<{ startHour: Hour, endHour: Hour }>(() => {
   const diff = height.value / calendarConfig.tile
   const startHour = (top.value) / calendarConfig.tile
   const endHour = diff + startHour


   return {
      startHour: decimalToHour(startHour),
      endHour: decimalToHour(endHour)
   }
})

const saveState = () => {

   if (isDrag.value) {
      const { _id, name, description, period: { year, month, day } } = props.event


      updateEvent(_id, {
         name,
         description,
         period: {
            year,
            month,
            day,
            startHour: hours.value.startHour,
            endHour: hours.value.endHour
         }
      })
   }
   isDrag.value = false

}

onMounted(() => {
   let offsetY = 0;
   const resize = (mouse_y: number, original_height: number) => (e: MouseEvent) => {
      const calculatedHeight = original_height + (e.pageY - mouse_y);
      if (calculatedHeight < eventRef.value!.parentElement!.clientHeight - top.value - 44) {
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
      isDrag.value = true
      const original_height = eventRef.value!.clientHeight

      if (e.offsetY > eventRef.value!.clientHeight - 10) {
         const resizeCallback = resize(e.pageY, original_height)
         window.addEventListener("mousemove", resizeCallback);

         window.addEventListener("mouseup", () => {
            saveState()
            window.removeEventListener("mousemove", resizeCallback)
         });
      } else {
         offsetY = e.y - eventRef.value!.offsetTop
         window.addEventListener("mousemove", move);

         window.addEventListener("mouseup", () => {
            saveState()
            window.removeEventListener("mousemove", move)

         });
      }
   }, false);
})
</script>

<template>
   <div
      aria-hidden="true"
      draggable="false"
      @dragstart="(e: DragEvent) => {
         e.preventDefault()
      }"
      :class="[`bg-${event.color}`, height < 60 && 'flex']"
      class="absolute rounded-md shadow-xl p-3 text-white select-none calendar-event items-center gap-3 cursor-grab"
      ref="eventRef"
      :style="{ height: `${height}px`, top: `${top}px` }"
      style="width: calc(100% - 0.5rem);"
   >
      <h1 class="text-md font-medium select-none">{{ event.name }}</h1>

      <p class="text-sm select-none">
         {{ formatHour(hours.startHour) }} -
         {{ formatHour(hours.endHour) }}
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

