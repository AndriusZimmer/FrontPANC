<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const video = ref(null)
const canvas = ref(null)
const image = ref(null)
const showVideo = ref(true)
const errorMessage = ref('')
const emit = defineEmits(['image-captured', 'close'])

// Acessa a webcam quando o componente é montado
onMounted(async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (video.value) {
      video.value.srcObject = stream
    }
  } catch (err) {
    console.error('Erro ao acessar a webcam:', err)
    errorMessage.value =
      'Não foi possível acessar a webcam. Verifique as permissões do navegador ou se a câmera já está em uso.'
  }
})

// Para a webcam antes de o componente ser desmontado
onBeforeUnmount(() => {
  if (video.value && video.value.srcObject) {
    const tracks = video.value.srcObject.getTracks()
    tracks.forEach((track) => track.stop())
  }
})

// Função para tirar a foto
const takePhoto = () => {
  if (!video.value || !canvas.value) {
    errorMessage.value = 'Erro: o vídeo ou o canvas não estão disponíveis.'
    console.error('Erro: o vídeo ou o canvas não estão disponíveis.')
    return
  }

  const context = canvas.value.getContext('2d')
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height)

  // Armazena a imagem como Data URL
  image.value = canvas.value.toDataURL('image/png')

  // Oculta o vídeo após a foto ser tirada
  showVideo.value = false

  // Emite o evento para o componente pai com a imagem capturada
  emit('image-captured', image.value)
}

// Função para selecionar foto da galeria
const selectPhoto = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    image.value = e.target.result
    // Oculta o vídeo
    showVideo.value = false
    // Emite o evento para o componente pai
    emit('image-captured', image.value)
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="image-search-container">
    <!-- Botão de fechar/voltar -->
    <button @click="$emit('close')" class="close-button">
      <span class="material-icons"> close </span>
    </button>

    <!-- Título -->
    <h2 class="section-title">Buscar por Imagem</h2>

    <!-- Exibe a mensagem de erro, se houver -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Vídeo da webcam -->
    <div class="webcam-container" v-if="showVideo && !errorMessage">
      <video ref="video" autoplay playsinline class="webcam-feed"></video>
      <!-- Adiciona o elemento canvas que faltava, mas o mantém oculto -->
      <canvas ref="canvas" style="display: none"></canvas>
    </div>

    <!-- Pré-visualização da imagem capturada ou selecionada -->
    <div v-if="image" class="image-preview-container">
      <img :src="image" alt="Imagem capturada" class="captured-image" />
    </div>

    <!-- Botões de controle -->
    <div class="control-buttons">
      <!-- Botão para tirar foto da webcam -->
      <button @click="takePhoto" class="camera-button" v-if="showVideo && !errorMessage">
        <span class="material-icons"> camera_alt </span>
        Tirar Foto
      </button>

      <!-- Botão para selecionar foto da galeria -->
      <label for="file-input" class="gallery-button">
        <span class="material-icons"> photo_library </span>
        <span>Galeria</span>
        <input type="file" id="file-input" @change="selectPhoto" accept="image/*" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.image-search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #eaf1e9;
  min-height: 100vh;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  color: #3c5c3c;
  font-size: 2rem;
  cursor: pointer;
}

.section-title {
  color: #3c5c3c;
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.error-message {
  color: #d9534f;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
}

.webcam-container {
  width: 100%;
  max-width: 600px;
  aspect-ratio: 4 / 3;
  background-color: #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.webcam-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-preview-container {
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.captured-image {
  width: 100%;
  height: auto;
  display: block;
}

.control-buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.camera-button,
.gallery-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.camera-button {
  background-color: #3c5c3c;
  color: white;
  box-shadow: 0 4px 8px rgba(60, 92, 60, 0.3);
}

.gallery-button {
  background-color: #f7f7f7;
  color: #3c5c3c;
  border: 1px solid #d4e3d4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.camera-button:hover,
.gallery-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.gallery-button input[type='file'] {
  display: none;
}
</style>
