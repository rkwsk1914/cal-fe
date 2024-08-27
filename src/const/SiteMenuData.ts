import { ListItemType } from '@/components/molecules/LinkMenu'

export const SITE_MENU_DATA: ListItemType[] = [
  { label: 'TOP', href: '/' },
  { label: '支出情報', href: '/expenditure' },
  { label: '口座情報', href: '/bank' },
  { label: '支払い方法情報', href: '/payment' },
  { label: '固定費情報', href: '/fixed-cost' },
  { label: 'ローン情報', href: '/loan' },
]