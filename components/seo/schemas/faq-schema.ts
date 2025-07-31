import { FAQPageSchema, Question } from '../schema-types'
import { Tool } from '@/lib/tools-data'
import { getToolFAQData } from '../faq-types'

export function generateFAQSchema(tool: Tool): FAQPageSchema {
  // Get FAQ data from the tool's seo-content file or fallback to defaults
  const faqs = getToolFAQData(tool.slug)
  
  const questions: Question[] = faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions
  }
}