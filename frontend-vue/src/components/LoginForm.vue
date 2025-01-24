<template>
  <form class="flex flex-col gap-y-6 w-80" @submit.prevent>
    <FormField label="Email" id="email" type="text" v-model="formData.email" :errors="errors.email" />
    <FormField label="Password" id="password" type="password" v-model="formData.password" :errors="errors.password" />
    <button @click="submit" type="submit"
      class="bg-black text-white rounded border border-solid border-black px-4 py-2 transition hover:bg-white hover:text-black">
      Sign In
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormField from "./FormField.vue";
import {
  validLoginFormSchema,
  type ValidLogin,
} from "../validation/form.validation";
import { loginUser } from "../util/auth-user-and-get-token";
import { useMutation } from "@tanstack/vue-query";
import router from "../router/router";
import { ZodError } from "zod";
import { NotFoundError } from "../errors/not-found-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

const formData = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

const validateForm = () => {
  errors.value.email = "";
  errors.value.password = "";

  try {
    validLoginFormSchema.parse(formData.value);

    return true;
  } catch (e) {
    if (e instanceof ZodError) {
      e.errors.forEach((error) => {
        errors.value[error.path[0] as keyof ValidLogin] = error.message;
      });
    }
  }
};

const { mutate } = useMutation({
  mutationFn: (data: ValidLogin) => loginUser(data),
  onSuccess: async () => {
    router.push("/");
  },
  onError: (err) => {
    if (err instanceof UnauthorizedError) {
      errors.value.password = err.message;
    }
  }
});

const submit = () => {
  if (validateForm()) {
    mutate(formData.value);
  }
};
</script>
