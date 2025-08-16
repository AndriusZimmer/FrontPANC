<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import pancService from '../services/PancService';

const route = useRoute();
const panc = ref(null);

const fetchPanc = async (id) => {
  try {
    panc.value = await pancService.getPancById(id);
  } catch (error) {
    console.error('Erro ao buscar Panc:', error);
  }
};

// Fetch on component mount
onMounted(() => {
  fetchPanc(route.params.id);
});

// Watch for changes in the route ID and refetch
watch(
  () => route.params.id,
  (newId) => {
    fetchPanc(newId);
  }
);
</script>

<template>
  <div v-if="panc">
    <h2>{{ panc.nome_cientifico }}</h2>
    <p><strong>Família:</strong> {{ panc.familia_botanica }}</p>

    <h3>Nomens Populares</h3>
    <ul>
      <li v-for="nome in panc.NomePopular" :key="nome.id">
        {{ nome.nome }} ({{ nome.lingua }})
      </li>
    </ul>
  </div>

  <div v-else>
    <p>Carregando dados...</p>
  </div>
</template>


