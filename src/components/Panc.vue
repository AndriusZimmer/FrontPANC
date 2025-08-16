<script setup>
const props = defineProps({
  panc: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="panc-card">
    <div class="panc-image-container">
      <img :src="panc.image_url" :alt="panc.nameScie" class="panc-image" />
    </div>
    <div class="panc-info-container">
      <div class="panc-header">
        <h2 class="panc-title">{{ panc.nameCommon }}</h2>
        <p class="panc-subtitle">({{ panc.nameScie }})</p>
      </div>

      <p class="panc-description">{{ panc.description }}</p>
    </div>
  </div>
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
  color: #3c5c3c; /* Cor verde para o título */
  margin: 0;
}

.panc-subtitle {
  font-style: italic;
  color: #666;
  font-size: 1rem;
  margin: 0;
}

.panc-tags {
  margin-bottom: 1rem;
}

.panc-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 500;
}

.alimenticia {
  background-color: #d8f5d8;
  color: #3c5c3c;
}

.flor {
  background-color: #f5e6d8;
  color: #b35900;
}

.nativa {
  background-color: #e6f3f5;
  color: #007799;
}

.panc-description {
  font-size: 1rem;
  line-height: 1.6;
}
</style>
