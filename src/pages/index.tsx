import { AllCreatePost } from '@/components/forms/template/AllCreatePost'
import { AppFrame } from '@/components/layouts/AppFrame'

import type { NextPage } from 'next'

const Top: NextPage = () => {
  return (
    <AppFrame>
      <AllCreatePost />
    </AppFrame>
  )
}

export default Top
