import { NextPage } from 'next'

import { ErrorPage } from '@/components/pages/ErrorPage'

type SSGProps = {}

const NotFound404: NextPage<SSGProps> = () => {
  return (
    <ErrorPage errorId={500}/>
  )
}

export default NotFound404