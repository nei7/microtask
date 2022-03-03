<script setup lang="ts">

const tasks = [{
   name: "JD",
   period: {
      startHour: 2,
      endHour: 5
   }
}]


</script>

<template>
   <div class="relative w-full">
      <div class="absolute w-full h-full" role="presentation">
         <div
            v-for="task in tasks"
            :style="{ height: `${(task.period.endHour - task.period.startHour) * 3.5}rem`, top: `${(task.period.startHour - 1) * 3.5}rem` }"
            class="w-full bg-blue-500 absolute"
         >{{ task.name }}</div>
      </div>

      <div v-for="hour in 24" class="w-full h-14 border-l border-b border-gray-200"></div>
   </div>
</template>