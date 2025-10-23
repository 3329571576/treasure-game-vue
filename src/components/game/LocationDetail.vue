<template>
  <div class="modal-overlay" @click="close">
    <div class="location-detail" @click.stop>
      <div 
        class="detail-content"
        :style="backgroundStyle"
      >
        <!-- 音乐控制 -->
        <div class="music-controls">
          <button 
            @click="toggleMusic" 
            class="music-btn"
            :title="isMusicPlaying ? '暂停音乐' : '播放音乐'"
          >
            {{ isMusicPlaying ? '🎵' : '🔇' }}
          </button>
        </div>
        
        <!-- 地点信息 -->
        <div class="location-info">
          <h2>{{ location.icon }} {{ getLocationName(location.id) }}</h2>
          <p class="location-description">{{ getLocationDescription(location.id) }}</p>
        </div>
        
        <!-- 控制按钮 -->
        <div class="detail-actions">
          <button @click="close" class="btn btn-close">
            🔙 返回地图
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationDetail',
  props: {
    location: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isMusicPlaying: false,
      audio: null,
      locationData: {
        library: {
          name: '古老图书馆',
          image: '/assets/图书馆.jpg',
          music: '/assets/图书馆.mp3',
          description: '这里收藏着无数古老的典籍和地图。据说在这里可以找到关于宝藏的第一个线索。仔细翻阅那些尘封的卷轴，或许能发现通往神秘洞穴的提示。'
        },
        cave: {
          name: '神秘洞穴',
          image: '/assets/洞穴.jpg',
          music: '/assets/洞穴.mp3',
          description: '隐藏在密林深处的神秘洞穴，入口被藤蔓遮掩。传说洞穴中藏有古老的地图，但也要小心落石和未知的危险。勇敢的探险家才能获得下一个线索。'
        },
        river: {
          name: '遗忘之河',
          image: '/assets/河流.jpg',
          music: '/assets/河流.mp3',
          description: '湍急的河流阻挡了去路，河水冰冷刺骨。据说只有真正的冒险家才能找到安全渡河的方法。对岸就是传说中的古老神庙所在地。'
        },
        temple: {
          name: '古老神庙',
          image: '/assets/神庙.jpg',
          music: '/assets/神庙.mp3',
          description: '宏伟的古老神庙，墙壁上刻满了神秘的符文。神庙守卫会出谜题考验来访者，只有智慧过人者才能继续前进，寻找最终的宝藏。'
        },
        treasure: {
          name: '宝藏之地',
          image: '/assets/宝藏.jpg',
          music: '/assets/宝藏.mp3',
          description: '传说中的宝藏就藏在这里！但想要获得宝藏，还需要通过最后的考验。小心机关和陷阱，只有最勇敢最智慧的探险家才能获得最终的奖励！'
        }
      }
    }
  },
  computed: {
    backgroundStyle() {
      const data = this.locationData[this.location.id]
      if (data && data.image) {
        return {
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${data.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }
      return {
        background: 'linear-gradient(135deg, #2c3e50, #34495e)'
      }
    }
  },
  mounted() {
    this.playBackgroundMusic()
  },
  beforeUnmount() {
    this.stopBackgroundMusic()
  },
  methods: {
    getLocationName(locationId) {
      return this.locationData[locationId]?.name || locationId
    },
    
    getLocationDescription(locationId) {
      return this.locationData[locationId]?.description || '暂无描述'
    },
    
    playBackgroundMusic() {
      const musicFile = this.locationData[this.location.id]?.music
      if (musicFile) {
        this.audio = new Audio(musicFile)
        this.audio.volume = 0.7
        this.audio.loop = true
        
        // 处理自动播放限制
        const playPromise = this.audio.play()
        if (playPromise !== undefined) {
          playPromise.then(() => {
            this.isMusicPlaying = true
            console.log('音乐开始播放:', musicFile)
          }).catch(error => {
            console.log('自动播放被阻止，需要用户交互:', error)
            // 显示提示，让用户知道可以点击播放
          })
        }
      } else {
        console.warn('未找到音乐文件:', musicFile)
      }
    },
    
    stopBackgroundMusic() {
      if (this.audio) {
        this.audio.pause()
        this.audio.currentTime = 0
        this.audio = null
        this.isMusicPlaying = false
      }
    },
    
    toggleMusic() {
      if (this.audio) {
        if (this.isMusicPlaying) {
          this.audio.pause()
          this.isMusicPlaying = false
        } else {
          this.audio.play().then(() => {
            this.isMusicPlaying = true
          }).catch(error => {
            console.error('音乐播放失败:', error)
          })
        }
      }
    },
    
    close() {
      this.stopBackgroundMusic()
      this.$emit('close')
    }
  },
  emits: ['close']
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.location-detail {
  width: 90%;
  height: 80%;
  max-width: 800px;
}

.detail-content {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 30px rgba(255,215,0,0.3);
  position: relative;
}

.music-controls {
  position: absolute;
  top: 15px;
  right: 15px;
}

.music-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.music-btn:hover {
  background: rgba(255,255,255,0.3);
  transform: scale(1.1);
}

.location-info {
  background: rgba(0, 0, 0, 0.7);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  max-width: 600px;
}

.location-info h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: gold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}

.location-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: white;
}

.detail-actions {
  margin-top: 20px;
}

.btn-close {
  background: #FF8C00;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-close:hover {
  background: #FFA500;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .location-info h2 {
    font-size: 2rem;
  }
  
  .location-description {
    font-size: 1rem;
  }
  
  .detail-content {
    padding: 20px;
  }
  
  .location-info {
    padding: 20px;
  }
}
</style>