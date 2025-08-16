<script setup>
import { ref, onMounted, computed } from 'vue'
import Panc from './Panc.vue'
import pancService from '../services/PancService'
import router from '@/router'
import Swal from 'sweetalert2'

const pancs = ref([])
const searchTerm = ref('')

const fetchPancs = async () => {
  try {
    pancs.value = await pancService.getAllPancs()
  } catch (error) {
    console.error('Erro ao buscar Panc:', error)
  }
}

onMounted(() => {
  fetchPancs()
})

const filteredPancs = computed(() => {
  if (!searchTerm.value) return pancs.value
  return pancs.value.filter(
    (panc) =>
      panc.nome_cientifico?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      panc.nome?.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

const fileInput = ref(null)

const openFilePicker = () => {
  fileInput.value.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  console.log('Imagem selecionada:', file)

  try {
    const panc = await pancService.detectar(file)

    if (!panc || !panc.id) {
      throw new Error('Não é PANC!')
    }

    await Swal.fire({
      icon: 'success',
      title: 'É PANC!',
      text: `Identificamos a planta: ${panc.nome_cientifico || 'ID ' + panc.id}`,
      confirmButtonText: 'Ver detalhes',
      confirmButtonColor: 'green',
    })

    router.push({ name: 'panc', params: { id: panc.id } })
  } catch (error) {
    console.error('Erro ao detectar PANC:', error)

    Swal.fire({
      icon: 'error',
      title: 'Não é PANC!',
      text: 'Não foi possível detectar a PANC. Tente novamente com outra imagem.',
      confirmButtonColor: 'red',
      confirmButtonText: 'Ok',
    })
  }
}
</script>

<template>
  <div class="pancs-container">
    <!-- Campo de busca -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Pesquisar por nome científico ou nome..."
      class="search-input"
    />

    <!-- Botão para escolher imagem -->
    <button @click="openFilePicker" class="floating-button">
      <span class="material-icons"> image_search </span>
    </button>

    <input
      type="file"
      accept="image/*"
      capture="environment"
      ref="fileInput"
      style="display: none"
      @change="handleFileChange"
    />

    <!-- Lista de PANCs filtrada -->
    <div v-for="(panc, index) in filteredPancs" :key="panc.id" class="panc-wrapper">
      <Panc :panc="panc" />
    </div>
  </div>
</template>

<style scoped>
.pancs-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #eaf1e9;
  min-height: 100vh;
}

/* Campo de busca */
.search-input {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus {
  border-color: #3c5c3c;
}

.floating-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #3c5c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  z-index: 1000;
}
.floating-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
