<script setup>
import { ref } from 'vue'
import json from '../assets/app.json'

const data = ref(json)

function getApp() {
  return data.value
}

defineExpose({
  getApp,
})
</script>

<template>
  <div></div>
</template>
