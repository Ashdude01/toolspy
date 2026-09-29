import { ToolPageWrapper } from '@/components/seo/tool-page-wrapper'
import { ToastProvider } from '@/components/tools/shared/toast-provider'
import { FontConverterTool } from './font-converter-tool'

/** Hero = CmsToolHero in layout. This page is tool UI only. */
export default function FontConverterPage() {
  return (
    <ToolPageWrapper toolSlug="font-converter">
      <ToastProvider>
        <div className="mx-auto max-w-7xl space-y-6 p-6">
          <FontConverterTool />
        </div>
      </ToastProvider>
    </ToolPageWrapper>
  )
}
