import { AUTO_COMPLETE_OPTIONS } from '@/const/form/AutoCompleteOptions'

import type { InputProps } from '@/types/form/InputAttribute'
import type { InputStyleChakura } from '@/types/form/InputStyle'

type Props = Pick<InputProps, 'readonly'> &
  InputStyleChakura

export const INPUT_ATTRIBUTE_OPTIONS: Record<keyof Props, {
  control: string,
  options?: Array<string>
}> =
{
  //inputのprops
  readonly: {
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



export const INPUT_AUTO_COMPLETE_OPTIONS: Record<'autoComplete', {
  control: string,
  options?: Array<string>
}> = {
  autoComplete: {
    control: 'select', options: AUTO_COMPLETE_OPTIONS as unknown as string[],
  },
}