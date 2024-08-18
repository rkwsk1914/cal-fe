
import type { InputProps, FormControlProps, InputStyleChakura } from '@/types/form'
import type { AutoCompleteType } from '@/types/form/AutoCompleteType'

type Props = Pick<InputProps, 'disabled' | 'readonly' | 'required'> &
  Pick<FormControlProps, 'isHidden' | 'isNaked' | 'isValid' | 'isShowLabel'> &
  InputStyleChakura

export const INPUT_ATTRIBUTE_OPTIONS: Record<keyof Props, {
  control: string,
  options?: Array<string>
}> =
{
  //inputのprops
  disabled: {
    control: 'boolean',
  },
  required: {
    control: 'boolean',
  },
  readonly: {
    control: 'boolean',
  },
  // FormControllerのprops
  isHidden: {
    control: 'boolean',
  },
  isNaked: {
    control: 'boolean',
  },
  isValid: {
    control: 'boolean',
  },
  isShowLabel: {
    control: 'boolean',
  },
  // スタイル系
  variant: {
    control: 'select', options: ['outline', 'filled', 'flushed', 'unstyled']
  },
  size: {
    control: 'radio', options: ['xs', 'sm', 'md', 'lg']
  },
}

const AutoCompleteOptions: Array<AutoCompleteType> = [
  'name',
  'email',
  'honorific-prefix',
  'given-name',
  'additional-name',
  'family-name',
  'honorific-suffix',
  'nickname',
  'username',
  'new-password',
  'current-password',
  'one-time-code',
  'organization-title',
  'organization',
  'street-address',
  'address-line1',
  'address-line2',
  'address-line3',
  'address-level4',
  'address-level3',
  'address-level2',
  'address-level1',
  'country',
  'country-name',
  'postal-code',
  'cc-name',
  'cc-given-name',
  'cc-additional-name',
  'cc-family-name',
  'cc-number',
  'cc-exp',
  'cc-exp-month',
  'cc-exp-year',
  'cc-csc',
  'cc-type',
  'transaction-currency',
  'transaction-amount',
  'language',
  'bday',
  'bday-day',
  'bday-month',
  'bday-year',
  'sex',
  'url',
  'photo'
]

export const INPUT_AUTO_COMPLETE_OPTIONS: Record<'autoComplete', {
  control: string,
  options?: Array<string>
}> = {
  autoComplete: {
    control: 'select', options: AutoCompleteOptions,
  },
}