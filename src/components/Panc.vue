<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  panc: {
    type: Object,
    required: true,
  },
})

const limitIndentificacaoBotanica = computed(() => {
  const limit = 250
  if (props.panc.identificacao_botanica.length > limit) {
    return props.panc.identificacao_botanica.substring(0, limit) + '...'
  }
  return props.panc.identificacao_botanica
})
</script>

<template>
  <router-link :to="{ name: 'panc', params: { id: panc.id } }" class="panc-card">
    <div class="panc-image-container">
      <img :src="panc.url_foto" :alt="panc.nameScie" class="panc-image" />
    </div>
    <div class="panc-info-container">
      <div class="panc-header">
        <h2 class="panc-title">{{ panc.nome }}</h2>
        <p class="panc-subtitle">({{ panc.nome_cientifico }})</p>
      </div>

      <p class="panc-description">{{ limitIndentificacaoBotanica }}</p>
    </div>
  </router-link>
</template>

<style scoped>
.panc-card {
  display: flex;
  gap: 1rem; /* Espaçamento entre a imagem e o texto */
  padding: 1.5rem;
  background-color: #f7f7f7; /* Um cinza claro de fundo */
  border: 1px solid #d4e3d4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none; /* Remove o sublinhado do link */
  color: inherit; /* Garante que a cor do texto não seja azul */
}

.panc-image-container {
  flex-shrink: 0; /* Impede que a imagem encolha */
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ccc;
}

.panc-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Garante que a imagem preencha o container sem distorcer */
}

.panc-info-container {
  display: flex;
  flex-direction: column;
  color: #333;
}

.panc-header {
  margin-bottom: 0.5rem;
}

.panc-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: #3c5c3c; /* Define a cor do título para não ser azul */
}

.panc-subtitle {
  font-size: 1rem;
  font-style: italic;
  margin: 0;
}

.panc-description {
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

/* Estilos responsivos para telas pequenas */
@media (max-width: 768px) {
  .panc-card {
    flex-direction: column; /* Altera a direção para coluna em telas pequenas */
    align-items: center; /* Centraliza os itens na coluna */
    text-align: center; /* Centraliza o texto */
  }

  .panc-image-container {
    width: 100%; /* A imagem ocupa a largura total */
    height: auto;
    margin-bottom: 1rem; /* Adiciona espaço abaixo da imagem */
  }

  .panc-info-container {
    align-items: center;
  }
}
</style>
