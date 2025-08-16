<script setup>
const props = defineProps({
  pancs: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div v-for="(panc, index) in pancs" :key="panc.id">
    <div class="rounded container-custom mb-4">
      <div>
        <label class="main-label-md pb-2"> {{ panc.nameScie }}</label>
        <label class="main-label-md pb-2"> {{ panc.description }}</label>
        <img src="../assets/panc.png" alt="panc gostosa" />
      </div>
    </div>
  </div>
</template>
