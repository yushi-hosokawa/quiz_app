<template>
  <div class="relative" ref="comboBoxRef">
    <div class="relative">
      <input
        v-model="inputValue"
        type="text"
        class="input-field pr-10"
        :placeholder="placeholder"
        @input="handleInput"
        @focus="showDropdown = true"
        @keydown.enter.prevent="handleEnter"
        @keydown.escape="showDropdown = false"
        @keydown.arrow-down.prevent="navigateDown"
        @keydown.arrow-up.prevent="navigateUp"
      />
      <button
        type="button"
        @click="toggleDropdown"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- ドロップダウンメニュー -->
    <div
      v-if="showDropdown"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <!-- 既存の選択肢 -->
      <div v-if="filteredOptions.length > 0">
        <button
          v-for="(option, index) in filteredOptions"
          :key="option.id"
          type="button"
          @click="selectOption(option)"
          class="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors"
          :class="{
            'bg-blue-100': index === highlightedIndex,
            'bg-gray-50': modelValue === option.id
          }"
        >
          {{ option.name }}
          <span v-if="modelValue === option.id" class="float-right text-blue-600">✓</span>
        </button>
      </div>

      <!-- 新規作成オプション -->
      <div
        v-if="inputValue.trim() && !exactMatch && allowCreate"
        class="border-t border-gray-200"
      >
        <button
          type="button"
          @click="createNewOption"
          class="w-full text-left px-4 py-2 hover:bg-green-50 transition-colors text-green-700 font-medium"
          :class="{ 'bg-green-100': highlightedIndex === filteredOptions.length }"
        >
          ➕ 「{{ inputValue.trim() }}」を新規作成
        </button>
      </div>

      <!-- 選択肢なし -->
      <div
        v-if="filteredOptions.length === 0 && (!inputValue.trim() || !allowCreate)"
        class="px-4 py-2 text-gray-500 text-sm"
      >
        {{ inputValue.trim() ? '該当する項目がありません' : '項目がありません' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  id: number
  name: string
}

interface Props {
  modelValue: number | null
  options: Option[]
  placeholder?: string
  allowCreate?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: number | null): void
  (e: 'create', name: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '選択または入力してください',
  allowCreate: true
})

const emit = defineEmits<Emits>()

const comboBoxRef = ref<HTMLElement | null>(null)
const inputValue = ref('')
const showDropdown = ref(false)
const highlightedIndex = ref(0)

// 選択された値に基づいて入力値を初期化
watchEffect(() => {
  if (props.modelValue) {
    const selected = props.options.find(opt => opt.id === props.modelValue)
    if (selected) {
      inputValue.value = selected.name
    }
  } else {
    inputValue.value = ''
  }
})

// フィルタリングされた選択肢
const filteredOptions = computed(() => {
  if (!inputValue.value.trim()) {
    return props.options
  }
  const searchTerm = inputValue.value.toLowerCase()
  return props.options.filter(opt =>
    opt.name.toLowerCase().includes(searchTerm)
  )
})

// 完全一致する項目があるかチェック
const exactMatch = computed(() => {
  return props.options.some(opt =>
    opt.name.toLowerCase() === inputValue.value.trim().toLowerCase()
  )
})

// 入力時の処理
const handleInput = () => {
  showDropdown.value = true
  highlightedIndex.value = 0

  // 入力値がどの選択肢とも一致しない場合、選択を解除
  const match = props.options.find(opt =>
    opt.name.toLowerCase() === inputValue.value.toLowerCase()
  )
  if (!match && props.modelValue !== null) {
    emit('update:modelValue', null)
  }
}

// ドロップダウンの表示切り替え
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    highlightedIndex.value = 0
  }
}

// 選択肢を選択
const selectOption = (option: Option) => {
  inputValue.value = option.name
  emit('update:modelValue', option.id)
  showDropdown.value = false
}

// 新規作成
const createNewOption = () => {
  const newName = inputValue.value.trim()
  if (newName) {
    emit('create', newName)
    showDropdown.value = false
  }
}

// Enterキーの処理
const handleEnter = () => {
  if (!showDropdown.value) {
    showDropdown.value = true
    return
  }

  if (highlightedIndex.value < filteredOptions.value.length) {
    // 既存の選択肢を選択
    selectOption(filteredOptions.value[highlightedIndex.value])
  } else if (inputValue.value.trim() && !exactMatch.value && props.allowCreate) {
    // 新規作成
    createNewOption()
  }
}

// 矢印キー下の処理
const navigateDown = () => {
  const maxIndex = props.allowCreate && inputValue.value.trim() && !exactMatch.value
    ? filteredOptions.value.length
    : filteredOptions.value.length - 1

  if (highlightedIndex.value < maxIndex) {
    highlightedIndex.value++
  }
}

// 矢印キー上の処理
const navigateUp = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
  }
}

// 外側クリックでドロップダウンを閉じる
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (comboBoxRef.value && !comboBoxRef.value.contains(event.target as Node)) {
      showDropdown.value = false
    }
  }

  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>
