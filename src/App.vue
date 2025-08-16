<script setup>
import { ref, onMounted } from 'vue'
import JsonRead from './components/JsonRead.vue'
import ListaPlanta from './components/ListaPlanta.vue'
import { useRouter } from 'vue-router'

const form = ref([])
const jsonRead = ref(null)

onMounted(() => {
  form.value = jsonRead.value.getApp()
})
</script>

<template>
  <JsonRead ref="jsonRead" />

  <header class="main-header">
    <div class="header-content">
      <h1 class="header-title">PANC.ai</h1>
    </div>
  </header>

  <div class="container" id="intro">
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-10 col-lg-8">
        <router-view :pancs="form"></router-view>
      </div>
    </div>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  /* `min-height: 100vh` garante que o contêiner principal */
  /* da aplicação ocupe no mínimo 100% da altura da tela */
  min-height: 100vh;
  background-color: #eaf1e9;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.main-header {
  /* Use `position: sticky` para fixar o header ao rolar */
  position: sticky;
  top: 0; /* Gruda no topo quando a rolagem atinge 0 */
  z-index: 10; /* Garante que o header fique acima de outros elementos */

  width: 100%;
  padding: 1rem 2rem;
  background-color: #3c5c3c; /* Cor de fundo escura */
  color: white; /* Texto branco */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-content {
  max-width: 800px; /* Limita a largura do conteúdo para telas grandes */
  width: 100%;
  text-align: center;
}

.header-title {
  margin: 0; /* Remove a margem padrão do <h1> */
  font-size: 2rem;
  font-weight: bold;
}
</style>
