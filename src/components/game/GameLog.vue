<template>
  <div class="log-container">
    <h3>📜 探险日志</h3>
    <div class="log">
      <div
        v-for="entry in logEntries"
        :key="entry.id"
        :class="['log-entry', entry.type]"
      >
        <span class="timestamp">[{{ entry.timestamp }}]</span> 
        {{ entry.message }}
      </div>
      <div v-if="logEntries.length === 0" class="empty-log">
        日志为空，开始你的冒险吧！
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../../stores/gameStore'
import { storeToRefs } from 'pinia'

export default {
  name: 'GameLog',
  setup() {
    const gameStore = useGameStore()
    const { logEntries } = storeToRefs(gameStore)
    
    return {
      logEntries
    }
  },
  mounted() {
    this.scrollToBottom()
  },
  updated() {
    this.scrollToBottom()
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const logElement = this.$el.querySelector('.log')
        if (logElement) {
          logElement.scrollTop = logElement.scrollHeight
        }
      })
    }
  }
}
</script>

<style scoped>
.log-container {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.log-container h3 {
  margin-bottom: 15px;
  border-bottom: 2px solid gold;
  padding-bottom: 5px;
  font-size: 1.3rem;
  color: gold;
}

.log {
  height: 200px;
  overflow-y: auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-family: 'Courier New', monospace;
}

.log-entry {
  margin-bottom: 10px;
  padding: 8px 12px;
  border-left: 3px solid gold;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 5px 5px 0;
  animation: fadeIn 0.5s ease;
}

.log-entry.highlight {
  border-left-color: gold;
  background: rgba(255, 215, 0, 0.1);
}

.log-entry.success {
  border-left-color: #90EE90;
  background: rgba(144, 238, 144, 0.1);
}

.log-entry.error {
  border-left-color: #FF6B6B;
  background: rgba(255, 107, 107, 0.1);
}

.timestamp {
  color: #888;
  font-size: 0.9em;
  margin-right: 8px;
}

.empty-log {
  text-align: center;
  color: #888;
  padding: 20px;
  font-style: italic;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .log {
    height: 150px;
    font-size: 0.9rem;
  }
}
</style>