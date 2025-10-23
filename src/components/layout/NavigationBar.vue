<template>
  <nav class="navigation">
    <div class="nav-container">
      <router-link to="/" class="nav-brand">
        🏴‍☠️ 寻宝大冒险
      </router-link>
      
      <div class="nav-links">
        <router-link to="/treasure-game-vue/" class="nav-link">游戏</router-link>
        <router-link to="/treasure-game-vue/leaderboard" class="nav-link">排行榜</router-link>
        <router-link to="/treasure-game-vue/profile" class="nav-link">个人中心</router-link>
      </div>
      
      <div class="user-info" v-if="currentUser">
        <UserAvatar :user="currentUser" />
        <span class="username">{{ currentUser.username }}</span>
        <button @click="logout" class="btn btn-secondary logout-btn">
          退出
        </button>
      </div>
      
      <div class="user-info" v-else>
        <button @click="showLogin = true" class="btn">
          登录/注册
        </button>
      </div>
    </div>

    <!-- 登录模态框 -->
    <div v-if="showLogin" class="modal-overlay" @click="showLogin = false">
      <div class="modal-content" @click.stop>
        <h3>登录/注册</h3>
        <input 
          v-model="username" 
          placeholder="请输入用户名" 
          class="input-field"
          @keyup.enter="login"
        />
        <div class="modal-actions">
          <button @click="login" class="btn btn-success">进入游戏</button>
          <button @click="showLogin = false" class="btn btn-secondary">取消</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useGameStore } from '../../stores/gameStore'
import { storeToRefs } from 'pinia'
import UserAvatar from '../ui/UserAvatar.vue'

export default {
  name: 'NavigationBar',
  components: {
    UserAvatar
  },
  setup() {
    const gameStore = useGameStore()
    const { currentUser } = storeToRefs(gameStore)
    const { loginUser, logoutUser } = gameStore
    
    return {
      currentUser,
      loginUser,
      logoutUser
    }
  },
  data() {
    return {
      showLogin: false,
      username: ''
    }
  },
  methods: {
    login() {
      if (this.username.trim()) {
        this.loginUser(this.username.trim())
        this.showLogin = false
        this.username = ''
      }
    },
    logout() {
      this.logoutUser()
    }
  }
}
</script>

<style scoped>
.navigation {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: gold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background 0.3s;
}

.nav-link:hover, .nav-link.router-link-active {
  background: rgba(255, 215, 0, 0.2);
  color: gold;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: white;
  font-weight: bold;
}

.logout-btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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