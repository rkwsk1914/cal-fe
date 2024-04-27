import * as React from 'react'
import { useState, useEffect } from 'react'

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Radio, RadioGroup,Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { CreatePost } from '@/components/forms/template/CreatePost'

// import styles from './style.module.scss'

export const AllCreatePost: React.FC = (): JSX.Element => {

  const { register, watch } = useForm(
    {
      defaultValues: {
        color: 'red'
      }
    }
  )
  const [ color, setColor ] = useState<'red' | 'green' | 'blue'>('red')
  const colorWatch = watch('color')

  useEffect(() => {
    setColor(colorWatch as 'red' | 'green' | 'blue')
  }, [colorWatch, setColor])

  return (
    <Tabs>
      <TabList>
        <Tab>Color</Tab>
        <Tab>1</Tab>
        <Tab>2</Tab>
        <Tab>3</Tab>
        <Tab>4</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <RadioGroup>
            <Stack direction='row'>
              <Radio {...register('color')} value='red'>red</Radio>
              <Radio {...register('color')} value='blue'>blue</Radio>
              <Radio {...register('color')} value='green'>green</Radio>
            </Stack>
          </RadioGroup>
        </TabPanel>
        <TabPanel>
          <CreatePost color={color} type="question" />
        </TabPanel>
        <TabPanel>
          <CreatePost  color={color} type="research" />
        </TabPanel>
        <TabPanel>
          <CreatePost  color={color} type="startled" />
        </TabPanel>
        <TabPanel>
          <CreatePost  color={color} type="creativity" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
