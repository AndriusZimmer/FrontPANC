<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import pancService from '../services/PancService'

const route = useRoute()
const panc = ref(null)

const prompt = ref('')
const resposta = ref('')
const displayResposta = ref('')
const isTyping = ref(false)
let intervalId = null

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
  (id) => {
    fetchPanc(id)
  },
)

const typewriterEffect = (text) => {
  let i = 0
  displayResposta.value = ''
  isTyping.value = true

  if (intervalId) {
    clearInterval(intervalId)
  }

  intervalId = setInterval(() => {
    if (i < text.length) {
      displayResposta.value += text.charAt(i)
      i++
    } else {
      clearInterval(intervalId)
      isTyping.value = false
    }
  }, 15)
  prompt.value = ''
}

async function mandarPrompt() {
  setTimeout(async () => {
    typewriterEffect((await pancService.perguntar(prompt.value, panc.value.id)).answer)
  }, 500)
}

let rows = ref(3)
let rowsNeeded = 0
function autoGrow(element) {
  if (element.scrollHeight > element.clientHeight) {
    rows.value = rows.value + 1
  }
}

function resizeBack(element) {
  rowsNeeded = (element.scrollHeight - element.clientHeight) / 21
  rows.value = rows.value + rowsNeeded
}
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

    <div class="panc-info-section">
      <div class="info-card full-width">
        <h3>Tire suas dúvidas sobre {{ panc.nome }}</h3>
        <textarea
          :id="panc.id"
          v-model="prompt"
          class="form-control form-control-sm textarea"
          type="text"
          @focus="resizeBack($event.target)"
          @blur="((rowsCache = rows), (rows = 3))"
          @input="autoGrow($event.target)"
          :rows="rows"
        ></textarea>
        <div class="chat-section">
          <button class="btn btn-custom" @click="mandarPrompt">Enviar</button>
          <p class="answer-text">{{ displayResposta }}</p>
          <span v-if="isTyping" class="typing-indicator"></span>
        </div>
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

.info-card.full-width h3 {
  margin-bottom: 1rem;
}

.textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.btn-custom {
  background-color: #3c5c3c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 8px rgba(60, 92, 60, 0.3);
}

.btn-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(60, 92, 60, 0.4);
}

.chat-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
}

.answer-text {
  white-space: pre-wrap;
  font-style: italic;
  animation: fade-in 1s ease-in;
}

.typing-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3c5c3c;
  animation: blink 1s infinite;
  margin-left: 5px;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
