<template>
  <div class="leaderboard-view">
    <header class="page-header">
      <h1>🏆 探险家排行榜</h1>
      <p>看看谁是最厉害的寻宝专家！</p>
    </header>

    <div class="leaderboard-content">
      <!-- 当前用户信息 -->
      <div v-if="currentUser" class="current-user-card">
        <div class="user-rank">
          <div class="user-avatar">{{ currentUser.username.charAt(0).toUpperCase() }}</div>
          <div class="user-info">
            <h3>{{ currentUser.username }}</h3>
            <p>分数: {{ currentUser.score }} | 等级: {{ currentUser.level }}</p>
            <p>完成冒险: {{ currentUser.completedAdventures }} 次</p>
          </div>
          <div class="user-position">
            <span class="rank-badge">
              第 {{ getUserRank(currentUser) }} 名
            </span>
          </div>
        </div>
      </div>

      <!-- 排行榜列表 -->
      <div class="leaderboard-list">
        <div class="leaderboard-header">
          <span class="rank-col">排名</span>
          <span class="user-col">探险家</span>
          <span class="score-col">分数</span>
          <span class="adventures-col">完成冒险</span>
        </div>

        <div
          v-for="(user, index) in userRankings"
          :key="user.id"
          :class="['leaderboard-item', { 
            current: currentUser && user.id === currentUser.id,
            top3: index < 3 
          }]"
        >
          <div class="rank-col">
            <span v-if="index < 3" class="medal">
              {{ ['🥇', '🥈', '🥉'][index] }}
            </span>
            <span v-else class="rank-number">{{ index + 1 }}</span>
          </div>
          
          <div class="user-col">
            <div class="user-avatar-small">{{ user.username.charAt(0).toUpperCase() }}</div>
            <span class="username">{{ user.username }}</span>
          </div>
          
          <div class="score-col">
            {{ user.score }}
          </div>
          
          <div class="adventures-col">
            {{ user.completedAdventures }}
          </div>
        </div>

        <div v-if="userRankings.length === 0" class="empty-state">
          <div class="empty-icon">📊</div>
          <h3>暂无排行榜数据</h3>
          <p>快去开始你的寻宝冒险吧！</p>
          <router-link to="/" class="btn btn-primary">开始游戏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore'
import { storeToRefs } from 'pinia'

export default {
  name: 'Leaderboard',
  setup() {
    const gameStore = useGameStore()
    const { currentUser, userRankings } = storeToRefs(gameStore)
    
    return {
      currentUser,
      userRankings
    }
  },
  methods: {
    getUserRank(user) {
      const sortedUsers = [...this.userRankings]
      return sortedUsers.findIndex(u => u.id === user.id) + 1
    }
  }
}
</script>

<style scoped>
.leaderboard-view {
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

.current-user-card {
  background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.2));
  border: 2px solid gold;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
}

.user-rank {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: gold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #8B4513;
}

.user-info h3 {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: gold;
}

.user-position {
  margin-left: auto;
}

.rank-badge {
  background: gold;
  color: #8B4513;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.1rem;
}

.leaderboard-list {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 20px;
}

.leaderboard-header {
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px;
  gap: 15px;
  padding: 15px 20px;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  color: gold;
}

.leaderboard-item {
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px;
  gap: 15px;
  padding: 15px 20px;
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  align-items: center;
}

.leaderboard-item:hover {
  background: rgba(255,255,255,0.1);
}

.leaderboard-item.current {
  background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.1));
  border-left: 4px solid gold;
}

.leaderboard-item.top3 {
  background: linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,140,0,0.2));
}

.rank-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.medal {
  font-size: 1.5rem;
}

.rank-number {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ccc;
}

.user-col {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar-small {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,215,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: gold;
}

.username {
  font-weight: bold;
}

.score-col {
  font-weight: bold;
  font-size: 1.1rem;
  color: gold;
}

.adventures-col {
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #ccc;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background: #FF8C00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  margin-top: 15px;
}

.btn:hover {
  background: #FFA500;
}

@media (max-width: 768px) {
  .leaderboard-header,
  .leaderboard-item {
    grid-template-columns: 60px 1fr 80px;
    gap: 10px;
  }
  
  .adventures-col {
    display: none;
  }
  
  .user-rank {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .user-position {
    margin-left: 0;
  }
}
</style>