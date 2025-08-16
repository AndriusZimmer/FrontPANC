<script setup>
import { ref } from 'vue'
import Panc from './Panc.vue'
import PancCamera from './PancCamera.vue'

const props = defineProps({
  pancs: {
    type: Array,
    required: true,
  },
})

const showPancCamera = ref(false)

const togglePancCamera = () => {
  showPancCamera.value = !showPancCamera.value
}

// Função que será chamada quando uma imagem for capturada no ImageSearch.vue
const handleImageCaptured = (imageData) => {
  // Aqui você pode processar a imagem (fazer upload, enviar para API, etc.)
  // Por enquanto, apenas exibimos um log
  console.log('Imagem capturada:', imageData)

  // Opcional: Voltar para a lista após a captura
  // showImageSearch.value = false;
}
</script>

<template>
  <div class="pancs-container">
    <button @click="togglePancCamera" class="floating-button">
      <span class="material-icons"> image_search </span>
    </button>

    <PancCamera
      v-if="showPancCamera"
      @image-captured="handleImageCaptured"
      @close="togglePancCamera"
    />

    <div v-if="!showPancCamera">
      <div v-for="(panc, index) in pancs" :key="panc.id" class="panc-wrapper">
        <Panc :panc="panc" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pancs-container {
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Espaçamento entre os cards */
  padding: 2rem;
  background-color: #eaf1e9; /* Cor de fundo da página, um verde bem claro */
  min-height: 100vh;
}
.panc-wrapper {
  /* Pode-se adicionar estilizações extras aqui, como margens */
  margin-bottom: 1.5rem;
}

/* Estilos do Botão Flutuante */
.floating-button {
  position: fixed; /* O elemento fica fixo em relação à viewport */
  bottom: 2rem; /* 2rem da parte inferior da tela */
  right: 2rem; /* 2rem da parte direita da tela */

  /* Estilização básica do botão */
  background-color: #3c5c3c;
  color: white;
  border: none;
  border-radius: 50%; /* Deixa o botão redondo */
  width: 60px;
  height: 60px;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  z-index: 1000; /* Garante que o botão fique na frente de outros elementos */
}

.floating-button:hover {
  transform: translateY(-2px); /* Efeito de elevação ao passar o mouse */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
