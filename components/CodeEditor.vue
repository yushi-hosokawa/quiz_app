<template>
  <div class="code-editor-container">
    <div class="code-editor-wrapper">
      <!-- 行番号エリア -->
      <div class="line-numbers-container" ref="lineNumbersRef">
        <div
          v-for="lineNum in lineCount"
          :key="lineNum"
          class="line-number"
        >
          {{ lineNum }}
        </div>
      </div>

      <!-- テキストエリアコンテナ -->
      <div class="textarea-container">
        <!-- コードエディタ -->
        <textarea
          :value="modelValue"
          @input="handleInput"
          @keydown="handleKeyDown"
          @scroll="handleScroll"
          class="code-editor-textarea"
          :placeholder="placeholder"
          ref="textareaRef"
          spellcheck="false"
        ></textarea>
      </div>
    </div>

    <!-- 文字数カウンター -->
    <div class="char-counter">
      {{ modelValue?.length || 0 }} 文字
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'コードを入力してください...'
  }
})

const emit = defineEmits(['update:modelValue'])

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const lineNumbersRef = ref<HTMLDivElement | null>(null)

// 行数を計算
const lineCount = computed(() => {
  const lines = (props.modelValue || '').split('\n').length
  return Math.max(lines, 1)
})

// 入力ハンドラー
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

// タブキーハンドラー
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.preventDefault()

    const target = event.target as HTMLTextAreaElement
    const start = target.selectionStart
    const end = target.selectionEnd
    const value = target.value

    // タブを2スペースに変換
    const spaces = '  ' // 4スペース
    const newValue = value.substring(0, start) + spaces + value.substring(end)

    emit('update:modelValue', newValue)

    // カーソル位置を調整
    nextTick(() => {
      if (textareaRef.value) {
        textareaRef.value.selectionStart = textareaRef.value.selectionEnd = start + spaces.length
      }
    })
  }
}

// スクロール同期
const handleScroll = () => {
  if (textareaRef.value && lineNumbersRef.value) {
    lineNumbersRef.value.scrollTop = textareaRef.value.scrollTop
  }
}
</script>

<style scoped>
.code-editor-container {
  position: relative;
  width: 100%;
}

.code-editor-wrapper {
  display: flex;
  width: 100%;
  border: 2px solid #374151;
  border-radius: 0.75rem;
  background-color: #111827;
  overflow: hidden;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  height: 28rem;
}

.line-numbers-container {
  background-color: #1f2937;
  color: #6b7280;
  padding: 0.625rem 0.75rem 0.625rem 0.5rem;
  text-align: right;
  user-select: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
  line-height: 1.375rem;
  min-width: 3.5rem;
  border-right: 1px solid #374151;
  overflow: hidden;
  flex-shrink: 0;
}

.line-number {
  height: 1.375rem;
  line-height: 1.375rem;
  white-space: nowrap;
}

.textarea-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.code-editor-textarea {
  width: 100%;
  height: 100%;
  padding: 0.625rem 1rem;
  background-color: #111827;
  color: #10b981;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
  line-height: 1.375rem;
  border: none;
  outline: none;
  resize: none;
  overflow-y: auto;
  overflow-x: auto;
  white-space: pre;
  word-wrap: normal;
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
  box-sizing: border-box;
}

.code-editor-textarea::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.code-editor-textarea::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 0 0 0.5rem 0;
}

.code-editor-textarea::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 6px;
  border: 2px solid #1f2937;
}

.code-editor-textarea::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.code-editor-textarea::-webkit-scrollbar-corner {
  background: #1f2937;
}

.code-editor-textarea::placeholder {
  color: #6b7280;
}

.code-editor-textarea:focus {
  outline: none;
}

.char-counter {
  position: absolute;
  bottom: 0.5rem;
  right: 0.75rem;
  font-size: 0.75rem;
  color: #9ca3af;
  pointer-events: none;
  background-color: rgba(31, 41, 55, 0.95);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  z-index: 20;
  border: 1px solid #374151;
}
</style>
