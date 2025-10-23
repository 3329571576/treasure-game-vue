<template>
  <div class="user-avatar" :style="avatarStyle">
    {{ userInitials }}
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    user: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  computed: {
    userInitials() {
      if (this.user.username) {
        return this.user.username.charAt(0).toUpperCase()
      }
      return '?'
    },
    
    avatarStyle() {
      const sizes = {
        small: '32px',
        medium: '48px',
        large: '64px'
      }
      
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
      ]
      
      const colorIndex = this.user.username.length % colors.length
      
      return {
        width: sizes[this.size],
        height: sizes[this.size],
        backgroundColor: colors[colorIndex],
        fontSize: this.getFontSize(this.size)
      }
    }
  },
  methods: {
    getFontSize(size) {
      const sizes = {
        small: '14px',
        medium: '18px',
        large: '24px'
      }
      return sizes[size]
    }
  }
}
</script>

<style scoped>
.user-avatar {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.1);
}
</style>