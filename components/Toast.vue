<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] space-y-2 max-w-md">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="rounded-xl shadow-2xl p-4 flex items-start space-x-3 border-2 backdrop-blur-sm"
          :class="toastClasses(toast.type)"
        >
          <div class="text-2xl flex-shrink-0">
            {{ toastIcon(toast.type) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium break-words">{{ toast.message }}</p>
          </div>
          <button
            @click="remove(toast.id)"
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { ToastType } from '~/composables/useToast'

const { toasts, remove } = useToast()

const toastClasses = (type: ToastType) => {
  const classes = {
    success: 'bg-green-50/95 border-green-500 text-green-900',
    error: 'bg-red-50/95 border-red-500 text-red-900',
    warning: 'bg-yellow-50/95 border-yellow-500 text-yellow-900',
    info: 'bg-blue-50/95 border-blue-500 text-blue-900'
  }
  return classes[type]
}

const toastIcon = (type: ToastType) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }
  return icons[type]
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
