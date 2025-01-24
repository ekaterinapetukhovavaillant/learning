<template>
  <h1 class="py-8 text-2xl font-bold">{{ title }}</h1>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
