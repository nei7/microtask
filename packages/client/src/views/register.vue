<script setup lang="ts">
import Input from "@/components/Input.vue";
import Card from "@/components/Card.vue";
import Button from "@/components/Button.vue";
import Alert from "@/components/Alert.vue";

import { reactive, ref } from "vue";


const email = ref("");
const password = ref("");
const repeatedPassword = ref("");

const loading = ref(false);

const error = reactive({
   active: false,
   message: "",
});

const register = () => {
};

const signInWithGoogle = () => { };
</script>

<template>
   <div class="w-full max-w-3xl mx-auto mt-20 px-6">
      <Card>
         <div class="mb-6">
            <Input placeholder="Email" type="email" label="Enter your email" v-model="email" />
         </div>
         <div class="mb-6">
            <Input
               placeholder="Password"
               type="password"
               label="Enter your password"
               v-model="password"
            />
         </div>
         <div class="mb-2">
            <Input
               placeholder="Repeat password"
               type="password"
               label="Enter your password"
               v-model="repeatedPassword"
            />
         </div>
         <Alert class="my-4" :text="error.message" v-model="error.active"></Alert>
         <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Already had an account?
            <a
               href="#"
               @click="$router.push('/login')"
               class="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >Log in</a>.
         </p>

         <Button text="Register" @click="register" :loading="loading" />
      </Card>
   </div>
</template>
