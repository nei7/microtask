<script setup lang="ts">
import { nanoid } from "nanoid";

// should be changed
const id = nanoid();

defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
  },

  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
});
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :id="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
      :required="required"
    />
  </div>
</template>
