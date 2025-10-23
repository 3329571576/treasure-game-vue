<template>
  <div class="profile-view">
    <header class="page-header">
      <h1>👤 个人中心</h1>
      <p>管理你的探险家档案</p>
    </header>

    <div v-if="!currentUser" class="login-prompt">
      <h2>请先登录</h2>
      <p>登录后查看个人档案</p>
      <router-link to="/" class="btn btn-primary">返回游戏</router-link>
    </div>

    <div v-else class="profile-content">
      <!-- 用户信息卡片 -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="user-avatar-large">{{ currentUser.username.charAt(0).toUpperCase() }}</div>
          <div class="profile-info">
            <h2>{{ currentUser.username }}</h2>
            <p class="join-date">加入时间: {{ formatDate(currentUser.joinDate) }}</p>
            <div class="user-stats">
              <div class="stat">
                <div class="stat-value">{{ currentUser.score }}</div>
                <div class="stat-label">分数</div>
              </div>
              <div class="stat">
                <div class="stat-value">{{ currentUser.level }}</div>
                <div class="stat-label">等级</div>
              </div>
              <div class="stat">
                <div class="stat-value">{{ currentUser.completedAdventures }}</div>
                <div class="stat-label">完成冒险</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏统计 -->
      <div class="stats-section">
        <h3>📊 游戏统计</h3>
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <div class="stat-value">{{ getUserRank(currentUser) }}</div>
              <div class="stat-label">排行榜排名</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-content">
              <div class="stat-value">{{ averageScorePerAdventure }}</div>
              <div class="stat-label">平均得分</div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions-section">
        <router-link to="/" class="btn btn-primary">返回游戏</router-link>
        <router-link to="/leaderboard" class="btn btn-secondary">查看排行榜</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore'
import { storeToRefs } from 'pinia'

export default {
  name: 'UserProfile',
  setup() {
    const gameStore = useGameStore()
    const { currentUser, userRankings } = storeToRefs(gameStore)
    
    return {
      currentUser,
      userRankings
    }
  },
  computed: {
    averageScorePerAdventure() {
      if (this.currentUser.completedAdventures === 0) return 0
      return Math.round(this.currentUser.score / this.currentUser.completedAdventures)
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('zh-CN')
    },
    
    getUserRank(user) {
      const sortedUsers = [...this.userRankings]
      const rank = sortedUsers.findIndex(u => u.id === user.id) + 1
      return rank > 0 ? `第 ${rank} 名` : '未上榜'
    }
  }
}
</script>

<style scoped>
.profile-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: gold;
}

.login-prompt {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
}

.profile-card {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 25px;
}

.user-avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: gold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: #8B4513;
  flex-shrink: 0;
}

.profile-info h2 {
  font-size: 2rem;
  margin-bottom: 8px;
  color: gold;
}

.join-date {
  color: #ccc;
  margin-bottom: 20px;
}

.user-stats {
  display: flex;
  gap: 25px;
}

.stat {
  background: rgba(255,255,255,0.1);
  padding: 15px 20px;
  border-radius: 10px;
  text-align: center;
  min-width: 80px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: gold;
  margin-bottom: 5px;
}

.stat-label {
  color: #ccc;
  font-size: 0.9rem;
}

.stats-section {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
}

.stats-section h3 {
  margin-bottom: 25px;
  color: gold;
  font-size: 1.5rem;
  text-align: center;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-3px);
}

.stat-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: gold;
  margin-bottom: 5px;
}

.stat-label {
  color: #ccc;
  font-size: 0.9rem;
}

.actions-section {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  color: white;
  font-size: 1.1rem;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(to right, #FF8C00, #FFA500);
}

.btn-secondary {
  background: linear-gradient(to right, #6c757d, #868e96);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .user-stats {
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .actions-section {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}
</style>