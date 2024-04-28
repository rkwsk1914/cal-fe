import * as React from 'react'

import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

interface Props {
  children?: string
}

export const MarkDownComponent: React.FC<Props> = (
  {
    children
  }
): JSX.Element => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}>{children}</ReactMarkdown>
  )
}
