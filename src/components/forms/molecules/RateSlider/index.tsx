import * as React from 'react'
import { useEffect, useState } from 'react'

import {
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark
} from '@chakra-ui/react'

import { FormControlElement } from '@/components/forms/atoms/FormControlElement'

import type { UseFormSetValue } from 'react-hook-form'

import type { InputProps, InputStyleChakura, FormControlProps } from '@/types/form'


type RefProps = Omit<InputProps, 'onChange' | 'onBlur'> &
  InputStyleChakura &
  FormControlProps & {
  minValue?: number
  parentSetValue?: UseFormSetValue<any>
}

export const RateSlider = React.forwardRef(
function RefComponent (
  props: RefProps,
  ref?: React.Ref<HTMLDivElement>
): JSX.Element {
  const size = props.size ?? 'lg'
  const { name, value, defaultValue, minValue = 0, parentSetValue } = props

  const labelStyles = {
    mt: '3',
    ml: '-17',
    fontSize: '14px',
  }

  const [sliderValue, setSliderValue] = useState<number>(
    value ? Number(value) : defaultValue ? Number(defaultValue) : minValue
  )

  const FormControlElementProps: FormControlProps = {
    // UI系
    label: props.label,
    unit: props.unit,
    subText: props.subText,
    // バリデーション系
    isValid: props.isValid,
    helpertext: props.helpertext,
    required: props.required,
    // スタイル系
    isHidden: props.isHidden,
    isNaked: props.isNaked,
    isShowLabel: props.isShowLabel
  }

  useEffect(() => {
    parentSetValue && parentSetValue(name, sliderValue )
  }, [name, sliderValue, parentSetValue])

  return (
    <FormControlElement {...FormControlElementProps}>
      <VStack spacing={4} pt='35' pb='35' px='6'>
        <Slider
          {...props}
          value={sliderValue}
          onChange={(val) => setSliderValue(val)}
          step={5}
          min={0}
          max={100}
          size={size}
          ref={ref}
        >
          <SliderMark value={0} {...labelStyles}>
            0%
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            50%
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            100%
          </SliderMark>
          <SliderMark
            value={sliderValue}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
          >
            {sliderValue}%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </VStack>
    </FormControlElement>
  )
})
