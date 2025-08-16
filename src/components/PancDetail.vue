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
    <div v-if="panc.img">
      <img :src="panc.img" :alt="panc.nome_cientifico" style="width: 100%; margin-top: 1rem;" />
    </div>
    <h2>{{ panc.nome_cientifico }}</h2>
    <p><strong>Família:</strong> {{ panc.familia_botanica }}</p>

    <h3>Nomens Populares</h3>
    <ul>
      <li v-for="nome in panc.nome_popular" :key="nome.id">
        {{ nome.nome }}
      </li>
    </ul>
  </div>

  <div v-else>
    <p>Carregando dados...</p>
  </div>
</template>


