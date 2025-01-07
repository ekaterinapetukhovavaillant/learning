<template>
  <div class="flex flex-col gap-y-2">
    <label :id="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      v-model="model"
      class="h-8 px-2 text-sm border-b border-black bg-transparent"
    />
    <span class="text-red" v:if="errors">{{ errors }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  id: string;
  type: string;
  errors: string;
}>();

const model = defineModel();
</script>
