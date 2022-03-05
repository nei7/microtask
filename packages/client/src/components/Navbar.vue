
<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

type NavbarItems = {
   name: string,
   path?: string,
   onclick?: () => void
}[]

const router = useRouter()

const items: NavbarItems = reactive([
   {
      name: 'Calendar',
      path: '/calendar',

   },
   {
      name: 'Daily tasks',
      path: '/tasks',
   },
   {
      name: 'Settings',
      path: '/settings',
   },
   {
      name: "Plan",
      path: '/plan',

   },
   {
      name: "Logout",
      onclick: () => {
         router.push('/login')
      }
   }
])


</script>

<template>
   <nav class="border-gray-200">
      <ul class="flex flex-wrap border-b border-gray-200 dark:border-gray-700 justify-center py-2">
         <li class="mr-2" v-for="item in items">
            <router-link
               @click="item.onclick"
               :class="$route.path.startsWith(item.path!) ? ['text-blue-600', 'active', 'dark:text-blue-500', 'bg-gray-100'] : ['text-gray-500', 'hover:text-gray-600', 'hover:bg-gray-50', 'dark:text-gray-400']"
               :to="item.path ? item.path : ''"
               class="inline-block py-4 px-4 text-sm font-medium text-center rounded-lg dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >{{ item.name }}</router-link>
         </li>
      </ul>
   </nav>
</template>