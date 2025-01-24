<template>
  <header class="flex justify-between items-center">
    <p v-if="userStore.user" class="">Hello, {{ userStore.user.name }}</p>
    <button class="font-medium transition hover:border-b" @click="logOut">
      Log Out
    </button>
  </header>
  <main class="flex flex-col items-center">
    <Title title="Your wallets"></Title>
    <ul class="grid grid-cols-3 w-full gap-4 justify-items-center">
      <li class="flex flex-col gap-y-2 items-center bg-black text-white w-full h-40 py-2 px-4 rounded-lg mb-4"
        v-for="(amount, currency) in walletsData">
        <p class="mb-8 text-lg">{{ currency }}</p>
        <p class="font-bold text-2xl">{{ amount }}</p>
      </li>
    </ul>
    <button
      class="rounded-full text-4xl font-bold border-2 border-black w-12 h-12 transition hover:bg-black hover:text-white">
      +
    </button>
  </main>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { savedToken, userStore } from "../store/user-store";
import Title from "../components/Title.vue";

const walletsData = reactive({
  EUR: "1000",
  USD: "1500",
  PLN: "2000",
});

const logOut = () => {
  savedToken.value = null;
};
</script>
