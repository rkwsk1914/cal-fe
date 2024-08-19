import * as React from 'react'

import {
  FormControl as ChakuraFormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Input as ChakuraInput } from '@chakra-ui/react'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { useGetDarkModeStyleClass } from '@/hooks/useGetDarkModeStyleClass'

import styles from './style.module.scss'

import type { TextInputProps } from '@/types/form/InputAttribute'

// InputMask に渡せる一般的な props の型を定義
interface InputMaskProps {
  mask?: string;
  value?: string;
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (_event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (_event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  maskPlaceholder?: string | null;
  alwaysShowMask?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  // 他の必要な props を追加
}

const MaskedInput = React.forwardRef<HTMLInputElement, InputMaskProps>((props, ref) => (
  <InputMask {...props} mask={props.mask ?? ''} maskChar="" inputRef={ref} />
))
MaskedInput.displayName = 'MyComponent'

type Props = {
  isError: boolean
  helperText?: string
  arrangement?: 'vertically' | 'horizontally'
  inputProps: TextInputProps
  trigger: () => void
};

export const InputText: React.FC<Props> = ({
  isError,
  helperText,
  arrangement = 'horizontally',
  inputProps,
  trigger,
}): JSX.Element => {
  const {
    label,
    control,
    id,
    inputTextArgs,
  } = inputProps

  const wrap = clsx(styles.wrap, {
    [styles.vertically]: arrangement === 'vertically',
    [styles.horizontally]: arrangement === 'horizontally',
  })
  const className = useGetDarkModeStyleClass(wrap, styles.dark)
  return (

    <ChakuraFormControl isInvalid={isError}>
      <div className={className}>
        {label && (
          <FormLabel className={styles.label}>{label}</FormLabel>
        )}
        <div className={styles.content}>
          {control ? (
          <Controller
            name={id}
            control={control}
            render={({ field }) => (
              <ChakuraInput
                as={MaskedInput}
                {...inputTextArgs}
                {...field}
                onBlur={trigger}
              />
            )}
          />
          ): (
            <ChakuraInput
              as={MaskedInput}
              {...inputTextArgs}
            />
          )}
          {!isError ? (
            <FormHelperText>
              {helperText}
            </FormHelperText>
          ) : (
            <FormErrorMessage>{helperText}</FormErrorMessage>
          )}
        </div>
      </div>
    </ChakuraFormControl>
  )
}
