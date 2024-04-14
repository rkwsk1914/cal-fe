export interface FormControlProps {
  // UI系
  label?: string
  unit?: string
  subText?: string
  // バリデーション系
  isValid?: boolean
  helpertext?: string
  required?: boolean
  // スタイル系
  isHidden?: boolean
  isNaked?: boolean
  isShowLabel?: boolean
  isTest?: boolean
}