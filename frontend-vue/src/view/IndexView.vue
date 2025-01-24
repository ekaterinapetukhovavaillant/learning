<template>
  <div class="pt-6 flex flex-col items-center h-screen">
    <div class="container mx-auto px-4 grow">
      <div v-if="!isAuth" class="flex flex-col gap-y-4 items-center">
        <Title title="Welcome to YourWallet"></Title>
        <LinkToPage to="/registration" name="Registration" />
        <LinkToPage to="/login" name="Login" />
      </div>
      <div class="w-full" v-if="isAuth">
        <UserView />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Title from "../components/Title.vue";
import LinkToPage from "../components/LinkToPage.vue";
import { isAuth, updateUserStore } from "../store/user-store";
import UserView from "./UserView.vue";
import Footer from "../components/Footer.vue";

if (isAuth) {
  updateUserStore();
}
</script>
