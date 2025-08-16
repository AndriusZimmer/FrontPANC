<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import pancService from '../services/PancService'
import json from '../assets/app.json'

const data = ref(json)
const route = useRoute()
const panc = ref(null)

const fetchPanc = async (id) => {
  try {
    panc.value = await pancService.getPancById(id)
  } catch (error) {
    console.error('Erro ao buscar Panc:', error)
  }
}

onMounted(() => {
  fetchPanc(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    fetchPanc(newId)
  },
)
</script>

<template>
  <div v-if="panc" class="panc-detail-container">
    <router-link to="/" class="back-button">
      <span class="material-icons"> arrow_back </span>
    </router-link>

    <div class="panc-header">
      <h1 class="panc-common-name">{{ panc.nome }}</h1>
      <p class="panc-scientific-name">({{ panc.nome_cientifico }})</p>
    </div>

    <div class="panc-image-container">
      <img :src="panc.img" :alt="panc.nome_cientifico" class="panc-image" />
    </div>

    <div class="panc-info-section">
      <div class="info-card">
        <h3>Família Botânica</h3>
        <p>{{ panc.familia_botanica }}</p>
      </div>
      <div class="info-card">
        <h3>Origem</h3>
        <p>{{ panc.origem }}</p>
      </div>
      <div class="info-card">
        <h3>Hábito e Crescimento</h3>
        <p>{{ panc.habito_crescimento }}</p>
      </div>
    </div>

    <div class="panc-info-section">
      <div class="info-card full-width">
        <h3>Identificação Botânica</h3>
        <p>{{ panc.identificacao_botanica }}</p>
      </div>
      <div class="info-card full-width">
        <h3>Nomes Populares</h3>
        <p>{{ panc.nome_popular.map((n) => n.nome).join(', ') }}</p>
      </div>
    </div>

    <div class="panc-info-section">
      <div class="info-card full-width">
        <h3>Partes Comestíveis</h3>
        <ul>
          <li v-for="(parte, index) in panc.partes_comestiveis" :key="index">
            <strong>{{ parte.parte }}:</strong> {{ parte.modo }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="not-found-container">
    <p>Planta não encontrada.</p>
    <router-link to="/" class="back-button"> Voltar para a lista </router-link>
  </div>
</template>

<style scoped>
.panc-detail-container {
  padding: 2rem;
  background-color: #eaf1e9;
  min-height: 100vh;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.back-button {
  align-self: flex-start;
  color: #3c5c3c;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;
}

.back-button:hover {
  transform: translateX(-5px);
}

.panc-header {
  text-align: center;
}

.panc-common-name {
  font-size: 2.5rem;
  font-weight: bold;
  color: #3c5c3c;
  margin: 0;
}

.panc-scientific-name {
  font-size: 1.2rem;
  font-style: italic;
  color: #666;
  margin: 0;
}

.panc-image-container {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.panc-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.panc-info-section {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.info-card {
  flex: 1 1 45%;
  background-color: #f7f7f7;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.info-card.full-width {
  flex: 1 1 100%;
}

.info-card h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #3c5c3c;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.info-card p,
.info-card ul {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.info-card ul {
  padding-left: 1.5rem;
}

.info-card li {
  margin-bottom: 0.5rem;
}

.not-found-container {
  text-align: center;
  padding: 4rem;
}
</style>
