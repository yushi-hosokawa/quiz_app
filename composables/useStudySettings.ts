export interface StudySettings {
  count: number | null
  questionTypes: string[]
  languageIds: number[]
  genreIds: number[]
  difficulties: string[]
  tags: string[]
  randomOrder: boolean
}

const defaultSettings: StudySettings = {
  count: null,
  questionTypes: ['choice', 'text', 'code'],
  languageIds: [],
  genreIds: [],
  difficulties: ['easy', 'medium', 'hard'],
  tags: [],
  randomOrder: true
}

const studySettings = ref<StudySettings>({ ...defaultSettings })

export const useStudySettings = () => {
  const setSettings = (settings: StudySettings) => {
    studySettings.value = { ...settings }
    console.log('[useStudySettings] Settings updated:', studySettings.value)
  }

  const getSettings = (): StudySettings => {
    console.log('[useStudySettings] Getting settings:', studySettings.value)
    return { ...studySettings.value }
  }

  const resetSettings = () => {
    studySettings.value = { ...defaultSettings }
  }

  return {
    setSettings,
    getSettings,
    resetSettings
  }
}
