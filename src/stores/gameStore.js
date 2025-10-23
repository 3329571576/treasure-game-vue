import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useGameStore = defineStore('game', () => {
    // 游戏状态
    const currentStep = ref(0);
    const isPlaying = ref(false);
    const isWaitingForNext = ref(false);
    const previousResult = ref(null);
    const logEntries = ref([]);

    // 用户状态
    const currentUser = ref(null);
    const users = ref([]);

    // 游戏配置 - 确保这个数组存在且正确
    const steps = ref([
        { id: 'library', name: '图书馆', icon: '📚' },
        { id: 'cave', name: '神秘洞穴', icon: '🕳️' },
        { id: 'river', name: '遗忘之河', icon: '🌊' },
        { id: 'temple', name: '古老神庙', icon: '🏛️' },
        { id: 'treasure', name: '宝藏之地', icon: '💎' }
    ]);

    // 计算属性
    const currentLocation = computed(() => {
        return steps.value[currentStep.value];
    });

    const userRankings = computed(() => {
        return [...users.value]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
    });

    // 方法
    const startGame = () => {
        isPlaying.value = true;
        currentStep.value = 0;
        isWaitingForNext.value = false;
        logEntries.value = [];
        addLog('🚀 开始新的寻宝冒险！', 'highlight');
    };

    const completeStep = (result) => {
        currentStep.value++;
        previousResult.value = result;
        isWaitingForNext.value = true;
        addLog(`✅ 完成 ${steps.value[currentStep.value - 1].name}`, 'success');
    };

    const continueGame = () => {
        isWaitingForNext.value = false;
        addLog('📍 前往下一个地点...', 'highlight');
    };

    const addLog = (message, type = '') => {
        const timestamp = new Date().toLocaleTimeString();
        logEntries.value.push({
            id: Date.now() + Math.random(),
            message,
            type,
            timestamp
        });
    };

    const resetGame = () => {
        isPlaying.value = false;
        currentStep.value = 0;
        isWaitingForNext.value = false;
        logEntries.value = [];
        addLog('🔄 游戏已重置', 'highlight');
    };

    // 用户管理方法
    const loginUser = (username) => {
        let user = users.value.find(u => u.username === username);
        if (!user) {
            user = {
                id: Date.now(),
                username,
                score: 0,
                level: 1,
                completedAdventures: 0,
                joinDate: new Date().toISOString()
            };
            users.value.push(user);
        }
        currentUser.value = user;
        saveToLocalStorage();
        return user;
    };

    const logoutUser = () => {
        currentUser.value = null;
    };

    const updateUserScore = (points) => {
        if (currentUser.value) {
            currentUser.value.score += points;
            currentUser.value.completedAdventures++;
            saveToLocalStorage();
        }
    };

    // 本地存储
    const saveToLocalStorage = () => {
        try {
            const data = {
                users: users.value,
                currentUser: currentUser.value
            };
            localStorage.setItem('treasureGameData', JSON.stringify(data));
        } catch (error) {
            console.error('保存数据失败:', error);
        }
    };

    const loadFromLocalStorage = () => {
        try {
            const data = JSON.parse(localStorage.getItem('treasureGameData'));
            if (data) {
                users.value = data.users || [];
                currentUser.value = data.currentUser || null;
            }
        } catch (error) {
            console.error('加载数据失败:', error);
        }
    };

    // 初始化
    loadFromLocalStorage();

    return {
        // 状态
        currentStep,
        isPlaying,
        isWaitingForNext,
        previousResult,
        logEntries,
        currentUser,
        users,
        steps,

        // 计算属性
        currentLocation,
        userRankings,

        // 方法
        startGame,
        completeStep,
        continueGame,
        addLog,
        resetGame,
        loginUser,
        logoutUser,
        updateUserScore
    };
});