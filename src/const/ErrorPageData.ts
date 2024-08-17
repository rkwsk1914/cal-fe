type Data = {
  title: string
  description: string
  content: React.ReactNode
}

export const ErrorPageData: { [key: number]: Data } = {
  404: {
    title: '404 - Page Not Found',
    description: '404 - Page Not Found',
    content: '404 - Page Not Found'
  },
  500: {
    title: '500 - Server-side error occurred',
    description: '500 - Server-side error occurred',
    content: '500 - Server-side error occurred'
  }
}
