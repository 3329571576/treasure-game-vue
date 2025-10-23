<template>
  <div class="map-container">
    <div class="map">
      <!-- 地点标记 -->
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        :class="['location', { 
          active: currentStep === index,
          completed: index < currentStep 
        }]"
        :style="getLocationStyle(index)"
        @click="showLocationDetail(step)"
      >
        <span class="location-icon">{{ step.icon }}</span>
        <span class="location-name">{{ step.name }}</span>
      </div>
      
      <!-- 路径 -->
      <div
        v-for="(path, index) in paths"
        :key="'path' + index"
        :class="['path', { active: currentStep > index }]"
        :style="getPathStyle(path)"
      ></div>
      
      <!-- 探险者 -->
      <div 
        class="explorer"
        :style="explorerStyle"
      >
        🧭
      </div>
    </div>
    
    <!-- 地点详情模态框 -->
    <LocationDetail
      v-if="selectedLocation"
      :location="selectedLocation"
      @close="selectedLocation = null"
    />
  </div>
</template>

<script>
import { useGameStore } from '../../stores/gameStore'
import { storeToRefs } from 'pinia'
import LocationDetail from './LocationDetail.vue'

export default {
  name: 'TreasureMap',
  components: {
    LocationDetail
  },
  setup() {
    const gameStore = useGameStore()
    const { currentStep, steps } = storeToRefs(gameStore)
    
    return {
      currentStep,
      steps
    }
  },
  data() {
    return {
      selectedLocation: null,
      paths: [
        { start: [10, 20], end: [30, 40], rotation: 20 },
        { start: [30, 40], end: [50, 70], rotation: 30 },
        { start: [50, 70], end: [70, 30], rotation: -40 },
        { start: [70, 30], end: [85, 60], rotation: 30 }
      ],
      locationPositions: [
        { top: '20%', left: '10%' },   // 图书馆
        { top: '40%', left: '30%' },   // 洞穴
        { top: '70%', left: '50%' },   // 河流
        { top: '30%', left: '70%' },   // 神庙
        { top: '60%', left: '85%' }    // 宝藏
      ]
    }
  },
  computed: {
    explorerStyle() {
      if (this.currentStep >= 0 && this.currentStep < this.locationPositions.length) {
        const pos = this.locationPositions[this.currentStep]
        return {
          top: pos.top,
          left: pos.left,
          transform: 'translate(-50%, -50%)'
        }
      }
      return { 
        top: '20%', 
        left: '10%',
        transform: 'translate(-50%, -50%)'
      }
    }
  },
  methods: {
    getLocationStyle(index) {
      const style = this.locationPositions[index]
      return {
        ...style,
        transform: 'translate(-50%, -50%)'
      }
    },
    
    getPathStyle(path) {
      return {
        top: `${path.start[1]}%`,
        left: `${path.start[0]}%`,
        width: '20%',
        height: '6px',
        transform: `rotate(${path.rotation}deg)`
      }
    },
    
    showLocationDetail(step) {
      this.selectedLocation = step
    }
  }
}
</script>

<style scoped>
.map-container {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.map {
  position: relative;
  height: 500px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%238B7355"/><path d="M0,0 L100,100 M100,0 L0,100" stroke="%2365533F" stroke-width="1"/></svg>');
  border: 3px solid #8B7355;
  border-radius: 10px;
  overflow: hidden;
}

.location {
  position: absolute;
  background: rgba(139, 69, 19, 0.9);
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  z-index: 10;
  cursor: pointer;
  border: 2px solid #8B4513;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: white;
}

.location:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6);
  z-index: 20;
}

.location.active {
  background: rgba(255, 215, 0, 0.95);
  color: #8B4513;
  transform: translate(-50%, -50%) scale(1.15);
  box-shadow: 0 0 25px gold;
  border-color: gold;
}

.location.completed {
  background: rgba(144, 238, 144, 0.9);
  border-color: #90EE90;
}

.location-icon {
  font-size: 1.5rem;
  display: block;
}

.location-name {
  font-size: 0.9rem;
  white-space: nowrap;
}

.path {
  position: absolute;
  background: rgba(255, 215, 0, 0.3);
  z-index: 5;
  transform-origin: left center;
  transition: all 0.5s ease;
  border-radius: 3px;
}

.path.active {
  background: gold;
  box-shadow: 0 0 8px gold;
}

.explorer {
  position: absolute;
  font-size: 2.5rem;
  z-index: 15;
  transition: all 1s ease-in-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

@media (max-width: 768px) {
  .map {
    height: 400px;
  }
  
  .location {
    padding: 8px 12px;
    min-width: 80px;
  }
  
  .location-icon {
    font-size: 1.2rem;
  }
  
  .location-name {
    font-size: 0.8rem;
  }
  
  .explorer {
    font-size: 2rem;
  }
}
</style>