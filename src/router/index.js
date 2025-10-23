import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'
import Leaderboard from '../views/Leaderboard.vue'
import UserProfile from '../views/UserProfile.vue'

const routes = [
    {
        path: '/treasure-game-vue/', // 添加仓库名前缀
        name: 'Game',
        component: GameView
    },
    {
        path: '/treasure-game-vue/leaderboard',
        name: 'Leaderboard',
        component: Leaderboard
    },
    {
        path: '/treasure-game-vue/profile',
        name: 'Profile',
        component: UserProfile
    },
    {
        path: '/treasure-game-vue/:pathMatch(.*)*',
        redirect: '/treasure-game-vue/'
    }
]

const router = createRouter({
    history: createWebHistory('/treasure-game-vue/'), // 添加仓库名
    routes
})

export default router