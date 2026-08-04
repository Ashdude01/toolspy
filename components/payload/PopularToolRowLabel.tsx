'use client'

import { useRowLabel } from '@payloadcms/ui'

export function PopularToolRowLabel() {
  const { data, rowNumber } = useRowLabel<{ toolSlug?: string }>()
  const slug = data?.toolSlug
  return <span>{slug ? slug : `Tool ${String(rowNumber).padStart(2, '0')}`}</span>
}
