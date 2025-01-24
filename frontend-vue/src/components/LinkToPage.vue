<template>
  <RouterLink :to="to"
    class="bg-black text-white rounded border border-solid border-black w-40 px-4 py-2 transition hover:bg-white hover:text-black text-center">
    {{ name }}
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  name: string;
}>();
</script>
