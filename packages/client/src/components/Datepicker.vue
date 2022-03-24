<script setup lang="ts">
defineEmits(["update:modelValue"]);

defineProps<{
   modelValue: string,
   type: 'time' | 'date'
}>();
</script>

<template>
   <div>
      <input
         v-model="modelValue"
         @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
         :type="type"
         class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
      />
   </div>
</template>

<style>
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
   background: transparent;
   bottom: 0;
   color: transparent;
   cursor: pointer;
   height: auto;
   left: 0;
   position: absolute;
   right: 0;
   top: 0;
   width: auto;
}
</style>