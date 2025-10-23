<template>
  <button
    :class="['game-button', type, { disabled: disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'GameButton',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.game-button {
  padding: 12px 25px;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  min-width: 160px;
}

.game-button.primary {
  background: linear-gradient(to right, #FF8C00, #FFA500);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.4);
}

.game-button.secondary {
  background: linear-gradient(to right, #6c757d, #868e96);
  color: white;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.4);
}

.game-button.success {
  background: linear-gradient(to right, #28a745, #20c997);
  color: white;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
}

.game-button.danger {
  background: linear-gradient(to right, #dc3545, #e83e8c);
  color: white;
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);
}

.game-button:hover:not(.disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.game-button.primary:hover:not(.disabled) {
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.6);
}

.game-button.secondary:hover:not(.disabled) {
  box-shadow: 0 6px 20px rgba(108, 117, 125, 0.6);
}

.game-button.success:hover:not(.disabled) {
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.6);
}

.game-button.danger:hover:not(.disabled) {
  box-shadow: 0 6px 20px rgba(220, 53, 69, 0.6);
}

.game-button.disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .game-button {
    padding: 10px 20px;
    font-size: 1rem;
    min-width: 140px;
  }
}
</style>