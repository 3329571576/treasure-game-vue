<template>
  <div id="app">
    <NavigationBar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavigationBar from './components/layout/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  color: #fff;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 通用样式 */
.btn {
  padding: 12px 25px;
  font-size: 1.1rem;
  background: linear-gradient(to right, #FF8C00, #FFA500);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.4);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.6);
}

.btn:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  background: linear-gradient(to right, #6c757d, #868e96);
}

.btn-success {
  background: linear-gradient(to right, #28a745, #20c997);
}

.highlight {
  color: gold;
  font-weight: bold;
}

.success {
  color: #90EE90;
  font-weight: bold;
}

.error {
  color: #FF6B6B;
  font-weight: bold;
}
</style>