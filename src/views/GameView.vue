<template>
  <div class="game-view">
    <header class="game-header" v-if="currentUser">
      <h1>🏴‍☠️ 寻宝大冒险 🗺️</h1>
      <p>欢迎, {{ currentUser.username }}! 分数: {{ currentUser.score }}</p>
    </header>

    <div v-if="!currentUser" class="login-prompt">
      <h2>请先登录</h2>
      <p>登录后开始你的寻宝冒险！</p>
      <button @click="showLogin = true" class="btn btn-primary">点击登录</button>
    </div>

    <div v-else class="game-area">
      <TreasureMap />
      
      <div class="game-controls">
        <button 
          @click="startAdventure" 
          :disabled="isPlaying"
          class="btn btn-primary"
        >
          开始寻宝
        </button>
        
        <button 
          @click="continueAdventure" 
          :disabled="!isWaitingForNext"
          class="btn btn-success"
        >
          前往下一个地点
        </button>
        
        <button 
          @click="resetGame" 
          :disabled="isPlaying && !isWaitingForNext"
          class="btn btn-secondary"
        >
          重新开始
        </button>
      </div>

      <GameLog />
    </div>

    <!-- 登录模态框 -->
    <div v-if="showLogin" class="modal-overlay" @click="showLogin = false">
      <div class="modal-content" @click.stop>
        <h3>登录</h3>
        <input 
          v-model="username" 
          placeholder="请输入用户名" 
          class="input-field"
          @keyup.enter="login"
        />
        <div class="modal-actions">
          <button @click="login" class="btn btn-success">进入游戏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore'
import { storeToRefs } from 'pinia'
import { TreasureMap as GameLogic } from '../utils/gameLogic'
import TreasureMap from '../components/game/TreasureMap.vue'
import GameLog from '../components/game/GameLog.vue'

export default {
  name: 'GameView',
  components: {
    TreasureMap,
    GameLog
  },
  setup() {
    const gameStore = useGameStore()
    const { 
      currentUser, 
      isPlaying, 
      isWaitingForNext,
      currentStep,
      previousResult,
      logEntries
    } = storeToRefs(gameStore)
    
    const { 
      startGame, 
      completeStep, 
      continueGame, 
      resetGame,
      addLog,
      updateUserScore,
      loginUser
    } = gameStore
    
    return {
      currentUser,
      isPlaying,
      isWaitingForNext,
      currentStep,
      previousResult,
      logEntries,
      startGame,
      completeStep,
      continueGame,
      resetGame,
      addLog,
      updateUserScore,
      loginUser
    }
  },
  data() {
    return {
      showLogin: true,
      username: '',
      continueCallback: null
    }
  },
  methods: {
    async startAdventure() {
      if (!this.currentUser || this.isPlaying) return
      
      this.startGame()
      
      try {
        let previousResult = null
        
        for (let i = 0; i < 5; i++) {
          this.addLog(`前往${this.getStepName(i)}...`, 'highlight')
          
          const result = await this.executeStep(i, previousResult)
          previousResult = result
          
          if (i < 4) {
            this.completeStep(result)
            // 等待用户点击继续
            await new Promise(resolve => {
              this.continueCallback = resolve
            })
          }
        }
        
        this.addLog("🎉 寻宝任务完成！", 'highlight')
        this.updateUserScore(100)
        this.resetGame()
        
      } catch (error) {
        this.addLog(`任务失败: ${error}`, 'error')
        this.resetGame()
      }
    },
    
    async executeStep(stepIndex, previousResult) {
      const methods = [
        GameLogic.getInitialClue,
        () => GameLogic.exploreCave(previousResult),
        GameLogic.crossRiver,
        GameLogic.solveRiddle,
        GameLogic.searchTemple
      ]
      
      return await methods[stepIndex]()
    },
    
    continueAdventure() {
      if (!this.isWaitingForNext) return
      
      this.continueGame()
      if (this.continueCallback) {
        this.continueCallback()
        this.continueCallback = null
      }
    },
    
    getStepName(index) {
      const names = ['图书馆', '神秘洞穴', '遗忘之河', '古老神庙', '宝藏之地']
      return names[index] || '未知地点'
    },
    
    login() {
      if (this.username.trim()) {
        this.loginUser(this.username.trim())
        this.showLogin = false
        this.username = ''
      }
    }
  }
}
</script>

<style scoped>
.game-view {
  min-height: 80vh;
}

.game-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.game-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.login-prompt {
  text-align: center;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  margin-top: 2rem;
}

.game-area {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.game-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  font-weight: bold;
}

.btn-primary {
  background: linear-gradient(to right, #FF8C00, #FFA500);
}

.btn-success {
  background: linear-gradient(to right, #28a745, #20c997);
}

.btn-secondary {
  background: linear-gradient(to right, #6c757d, #868e96);
}

.btn:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none !important;
}

.btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  padding: 2rem;
  border-radius: 15px;
  min-width: 300px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin: 1rem 0;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>