<script setup lang="ts">import { nanoid } from 'nanoid';

defineEmits(['update:modelValue'])
defineProps<{
   items: {
      name: string,
      onclick?: () => void
   }[]
   modelValue: string
}>()

const id = nanoid()
</script>


<template>
   <button
      :id="`dropdown-button-${id}`"
      :data-dropdown-toggle="`dropdown-${id}`"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
   >
      {{ modelValue }}
      <svg
         class="ml-2 w-4 h-4"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
   </button>
   <div
      :id="`dropdown-${id}`"
      class="hidden z-50 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
   >
      <ul class="py-1" :aria-labelledby="`dropdown-button-${id}`">
         <li
            v-for="item in items"
            @click="$emit('update:modelValue', item.name); item.onclick && item.onclick()"
         >
            <a
               href="#"
               class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >{{ item.name }}</a>
         </li>
      </ul>
   </div>
</template>