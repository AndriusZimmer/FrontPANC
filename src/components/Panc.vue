<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  panc: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <router-link :to="{ name: 'panc', params: { id: panc.id } }" class="panc-card">
    <div class="panc-top-container">
      <div class="panc-image-container">
        <img :src="panc.img" :alt="panc.nameScie" class="panc-image" />
      </div>
      <div class="panc-header">
        <h2 class="panc-title">{{ panc.nome }}</h2>
        <p class="panc-subtitle">({{ panc.nome_cientifico }})</p>
      </div>
    </div>
    <div class="panc-info-container">
      <p class="panc-description">{{ panc.identificacao_botanica }}</p>
    </div>
  </router-link>
</template>

<style scoped>
.panc-card {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 600px;
  gap: 0rem;
  padding: 1.5rem;
  background-color: #f7f7f7;
  border: 1px solid #d4e3d4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.panc-top-container {
  display: flex;

  border: 1px solid #ccc;
}

.panc-image-container {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ccc;
}

.panc-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.panc-info-container {
  text-align: justify;
  text-indent: 1em;
  display: flex;
  flex-direction: column;
  color: #333;
}

.panc-header {
  padding: 0.5em;
}

.panc-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3c5c3c;
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
