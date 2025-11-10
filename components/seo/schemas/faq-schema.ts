import { FAQPageSchema, Question } from '../schema-types'
import { Tool } from '@/lib/tools-data'
import { getToolFAQData, FAQItem } from '../faq-types'
import { siteConfig } from '@/lib/config'

export function generateFAQSchema(tool: Tool): FAQPageSchema | null {
  try {
    // Get FAQ data from the tool's seo-content file or fallback to defaults
    // Try multiple identifiers to ensure we find the FAQs
    const identifiers = [tool.slug, tool.id].filter(Boolean) as string[]
    let faqs: FAQItem[] = []
    
    // Try each identifier until we find FAQs
    for (const identifier of identifiers) {
      const foundFaqs = getToolFAQData(identifier)
      if (foundFaqs && foundFaqs.length > 0) {
        faqs = foundFaqs
        break
      }
    }
    
    // Filter out invalid FAQs
    const validFAQs = faqs.filter(faq => 
      faq && 
      faq.question && 
      typeof faq.question === 'string' && 
      faq.question.trim().length > 0 &&
      faq.answer && 
      typeof faq.answer === 'string' && 
      faq.answer.trim().length > 0
    )
    
    // Return null if no valid FAQs found
    if (validFAQs.length === 0) {
      return null
    }
    
    const questions: Question[] = validFAQs.map(faq => ({
      '@type': 'Question',
      name: faq.question.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.trim()
      }
    }))

    const faqSchema: FAQPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions,
      url: tool.seo?.canonicalUrl || `${siteConfig.url}${tool.path}`,
      about: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        url: tool.seo?.canonicalUrl || `${siteConfig.url}${tool.path}`
      }
    }
    
    return faqSchema
  } catch (error) {
    console.error(`Error generating FAQ schema for ${tool.slug}:`, error)
    return null
  }
}