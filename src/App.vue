<script setup></script>

<template>
  <header class="main-header">
    <div class="header-content">
      <h1 class="header-title">Amigo PANC</h1>
    </div>
  </header>

  <div class="container" id="intro">
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-10 col-lg-8">
        <router-view></router-view>
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
  min-height: 100vh;
  background-color: #eaf1e9;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.main-header {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #3c5c3c;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-content {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.header-title {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
}
</style>
