<script setup>
import { ref, onMounted } from 'vue'
import JsonRead from './components/JsonRead.vue'
import strings from './assets/strings.json'
import ListaPlanta from './components/ListaPlanta.vue'

const form = ref([])
const jsonRead = ref(null)

onMounted(() => {
  form.value = jsonRead.value.getApp()
})
</script>

<template>
  <JsonRead ref="jsonRead" />

  <div id="jumbo" class="jumbotron m-5">
    <div class="container text-center">
      <h1 class="main-title-xl">Blitzkrieg Bop</h1>
    </div>
  </div>

  <div class="container" id="intro">
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-10 col-lg-8">
        <lista-planta :pancs="form" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
