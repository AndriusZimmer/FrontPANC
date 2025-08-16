<script setup>
import { ref, onMounted  } from 'vue'
import Panc from './Panc.vue'
import pancService from '../services/PancService';
import router from '@/router';

const pancs = ref(null);

const fetchPancs = async (id) => {
    try {
        pancs.value = await pancService.getAllPancs(id);
    } catch (error) {
        console.error('Erro ao buscar Panc:', error);
    }
};

// Fetch on component mount
onMounted(() => {
  fetchPancs();
});

// ref para o input
const fileInput = ref(null)

const openFilePicker = () => {
  fileInput.value.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    console.log("Imagem selecionada:", file)

    // Exemplo de envio via FormData
    var panc = await pancService.detectar(file);
    
    router.push({ name: 'panc', params: { id: panc.id } })

    // Exemplo (se quiser integrar depois)
    // await axios.post('/api/upload', formData)
  }
}
</script>

<template>
  <div class="pancs-container">
    <!-- Botão flutuante -->
    <button @click="openFilePicker" class="floating-button">
      <span class="material-icons"> image_search </span>
    </button>

    <!-- Input escondido -->
    <input
      type="file"
      accept="image/*"
      capture="environment"
      ref="fileInput"
      style="display: none"
      @change="handleFileChange"
    />

    <!-- Lista de Pancs -->
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
