<template>
  <form class="flex flex-col gap-y-6 w-80" @submit.prevent>
    <FormField label="Name:" type="text" id="name" v-model="formData.name" :errors="errors.name" />
    <FormField label="Email:" type="text" id="email" v-model="formData.email" :errors="errors.email" />
    <FormField label="Password:" type="password" id="password" v-model="formData.password" :errors="errors.password" />
    <button @click="submit" type="submit"
      class="bg-black text-white rounded border border-solid border-black px-4 py-2 transition hover:bg-white hover:text-black">
      Sign Up
    </button>
  </form>
</template>

<script setup lang="ts">
import FormField from "./FormField.vue";
import { ref } from "vue";
import {
  validRegistrationFormSchema,
  type ValidUser,
} from "../validation/form.validation";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/vue-query";
import { config } from "../config";
import router from "../router/router";
import { loginUser } from "../util/auth-user-and-get-token";

const formData = ref({
  name: "",
  email: "",
  password: "",
});

const errors = ref({
  name: "",
  email: "",
  password: "",
});

const validateForm = () => {
  errors.value.name = "";
  errors.value.email = "";
  errors.value.password = "";

  try {
    validRegistrationFormSchema.parse(formData.value);

    return true;
  } catch (err) {
    if (err instanceof ZodError) {
      err.errors.forEach((error) => {
        errors.value[error.path[0] as keyof ValidUser] = error.message;
      });
    }
  }
};

const { mutate } = useMutation({
  mutationFn: (data: ValidUser) =>
    fetch(`${config.backendApiUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    }),
  onSuccess: async () => {
    const loginData = {
      email: formData.value.email,
      password: formData.value.password,
    };

    await loginUser(loginData);

    router.push("/");
  },
});

const submit = () => {
  if (validateForm()) {
    mutate(formData.value);
  }
};
</script>
