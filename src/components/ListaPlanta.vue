<script setup>
import Panc from './Panc.vue'

const props = defineProps({
  pancs: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="pancs-container">
    <button class="floating-button"><span class="material-icons"> image_search </span></button>

    <div v-for="(panc, index) in pancs" :key="panc.id" class="panc-wrapper">
      <Panc :panc="panc" />
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
