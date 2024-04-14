import { UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'

export type UseFormPropsType = {
  trigger?: UseFormTrigger<any>
  setValue?: UseFormSetValue<any>
  watch?: UseFormWatch<any>
}

export type AddonText = {
  leftAddon?: string
  rightAddon?: string
}