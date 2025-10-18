// 問題タイプ
export type QuestionType = 'choice' | 'text' | 'code'

// 難易度
export type Difficulty = 'easy' | 'medium' | 'hard'

// 問題データ
export interface Problem {
  id: number
  questionType: QuestionType
  questionText: string
  answerText?: string | null
  explanation?: string | null
  languageId?: number | null
  genreId?: number | null
  difficulty?: Difficulty | null
  createdAt: Date
  updatedAt: Date
  language?: Language | null
  genre?: Genre | null
  choices?: Choice[]
  tags?: ProblemTag[]
}

// 選択肢
export interface Choice {
  id: number
  problemId: number
  choiceText: string
  isCorrect: boolean
  displayOrder: number
}

// 言語
export interface Language {
  id: number
  name: string
  createdAt: Date
}

// ジャンル
export interface Genre {
  id: number
  name: string
  createdAt: Date
}

// タグ
export interface ProblemTag {
  id: number
  problemId: number
  tagName: string
}

// 学習セッション
export interface StudySession {
  id: number
  sessionStart: Date
  sessionEnd?: Date | null
  totalQuestions: number
}

// 学習記録
export interface StudyRecord {
  id: number
  sessionId: number
  problemId: number
  isCorrect: boolean
  userAnswer?: string | null
  answeredAt: Date
  timeSpent?: number | null
}

// CSV インポート用
export interface CSVProblemData {
  question_type: string
  question_text: string
  answer_text: string
  explanation: string
  language: string
  genre: string
  difficulty: string
  tags: string
  choice1?: string
  choice2?: string
  choice3?: string
  choice4?: string
  correct_choice?: string
}

// 統計データ
export interface StudyStats {
  totalProblems: number
  totalStudySessions: number
  totalCorrectAnswers: number
  totalAnswers: number
  accuracyRate: number
  studyDays: number
  recentActivity: {
    date: string
    count: number
  }[]
}
