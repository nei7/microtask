<script setup lang="ts">
import type { CalendarEvent } from '@/types/calendar'
import type { Moment } from 'moment'
import { emmiter } from '@/composables/useEvent'
import { useCalendarStore } from '@/stores/calendar'
import { calculateTop, decimalToHour } from '@/utils/calendar'
import moment from 'moment'
import { v4 } from 'uuid'
import { reactive, ref, watch } from 'vue'
import Event from './CalendarEvent.vue'


const props = defineProps<{
   date: Moment
   format: 'Week' | 'Day'
}>()



const store = useCalendarStore()
const selectedEvent = ref<CalendarEvent | null>(null)

const now = moment()

const getEvents = () => store.getEvents({ day: props.date.date(), month: props.date.month(), year: props.date.year() })
const events = reactive({ value: getEvents() })

watch(() => props.date, () => {
   events.value = getEvents()
})

const addEvent = (e: MouseEvent) => {
   const time = decimalToHour(e.offsetY / 44)
   const event: CalendarEvent = {
      _id: v4(),
      name: "",
      description: "",
      color: 'blue-700',
      period: {
         year: props.date.year(),
         month: props.date.month(),
         day: props.date.date(),
         startHour: {
            hour: time.hour,
            minute: 0
         },
         endHour: {
            hour: time.hour + 1,
            minute: 0
         }
      }
   }
   store.$patch(state => {
      events.value.push(event)
      state.events.push(event)
      emmiter.emit('created', event._id)
   })

   selectedEvent.value = event
}

emmiter.on('updated', () => {
   events.value = getEvents()
})

emmiter.on('deleted', () => {
   events.value = getEvents()
})

</script>

<template>
   <div class="w-full">
      <div
         class="w-full border-l p-2 pr-5"
         :style="date.day() === 0 || format === 'Day' ? { 'margin-left': '4.5rem' } : {}"
      >
         <div
            class="text-gray-500 text-sm font-medium px-2.5 py-0.5 rounded"
            :class="date.isSame(moment(), 'day') && ['bg-blue-100', 'text-blue-800']"
            style="width: calc(100% - 4.5rem);"
         >{{ date.format("ddd - DD") }}</div>
      </div>
      <div class="flex">
         <div style="margin-top: 0rem;" v-if="date.day() === 0 || format === 'Day'">
            <div class="flex" v-for="hour in 24">
               <span
                  class="text-xs text-gray-500 w-16 h-11 pl-6 pt-10"
               >{{ !(hour % 12) ? 12 : hour % 12 }} {{ hour > 12 ? 'PM' : 'AM' }}</span>
               <div class="border-t w-2"></div>
            </div>
            <div class="flex w-18 justify-end">
               <div class="border-t w-2 pt-10"></div>
            </div>
         </div>

         <div
            class="w-full relative overflow-y-auto overflow-x-hidden"
            :class="format === 'Week' && ['w-64']"
            @dblclick="addEvent"
         >
            <div class="absolute w-full h-full cursor-pointer" role="presentation">
               <div class="w-px bg-gray-200" style="height: calc(2.75rem * 24)"></div>

               <div
                  v-if="now.isSame(date, 'day')"
                  class="bg-red-500 w-full absolute"
                  style="height: 2.5px"
                  :style="{ top: `${calculateTop({ hour: now.hour(), minute: now.minute() })}px` }"
               ></div>

               <Event
                  v-for="event in events.value"
                  :event="event"
                  class="z-10"
                  @dblclick="$event => {
                     $event.stopPropagation()
                     emmiter.emit('created', event._id)
                  }"
                  @contextmenu="$event => {
                     $event.preventDefault()
                     emmiter.emit('created', event._id)
                  }"
               ></Event>
            </div>

            <div class="border-t hours">
               <div v-for="hour in 24" class="w-full h-11 border-b border-gray-200"></div>
               <div class="h-11"></div>
            </div>
         </div>
      </div>
   </div>
</template>