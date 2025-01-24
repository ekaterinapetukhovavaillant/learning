<template>
  <div class="pt-6 flex flex-col items-center h-screen">
    <div class="container mx-auto px-4 grow">
      <div class="flex flex-col gap-y-4 items-center">
        <Title title="Login"></Title>
        <LoginForm />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Title from "../components/Title.vue";
import LoginForm from "../components/LoginForm.vue";
import Footer from "../components/Footer.vue";
</script>
