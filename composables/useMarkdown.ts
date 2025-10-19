import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

export const useMarkdown = () => {
  // Markedの設定
  marked.setOptions({
    breaks: true, // 改行を<br>に変換
    gfm: true, // GitHub Flavored Markdown
  })

  /**
   * MarkdownをHTMLに変換（サニタイズ付き）
   */
  const renderMarkdown = (markdown: string | null | undefined): string => {
    if (!markdown) return ''

    try {
      const rawHtml = marked.parse(markdown) as string
      // XSS対策のためサニタイズ
      return DOMPurify.sanitize(rawHtml)
    } catch (error) {
      console.error('Failed to parse markdown:', error)
      return markdown
    }
  }

  return {
    renderMarkdown
  }
}
