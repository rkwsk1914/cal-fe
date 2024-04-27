import * as React from 'react'
import { useState, useEffect, useRef } from 'react'


import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text } from '@chakra-ui/react'
import { Radio, RadioGroup,Stack } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Button } from '@/components/atoms/Button'
import { CreatePost } from '@/components/forms/template/CreatePost'

import styles from './style.module.scss'

export const AllCreatePost: React.FC = (): JSX.Element => {
  const defaultLastContent = 'よかったら保存してみてね `！`'

  const methods = useForm(
    {
      defaultValues: {
        color: 'red',
        first: '',
        second: '',
        third: '',
        forth: '',
        last: defaultLastContent
      }
    }
  )
  const { register, watch } = methods
  const [ color, setColor ] = useState<'red' | 'green' | 'blue'>('red')
  const colorWatch = watch('color')
  const firstWatch = watch('first')
  const secondWatch = watch('second')
  const thirdWatch = watch('third')
  const forthWatch = watch('forth')

  const textRef = useRef<HTMLDivElement>(null)

  const handleCopy = () => {
    const text = textRef.current ? textRef.current.innerText : ''
    navigator.clipboard.writeText(text)
      .then(() => {})
      .catch(_err => {
        alert('コピーに失敗しました。',)
      })
  }

  useEffect(() => {
    setColor(colorWatch as 'red' | 'green' | 'blue')
  }, [colorWatch, setColor])


  return (
    <FormProvider {...methods}>
      <Tabs isFitted>
        <TabList>
          <Tab>Set</Tab>
          <Tab>1</Tab>
          <Tab>2</Tab>
          <Tab>3</Tab>
          <Tab>4</Tab>
          <Tab>Last</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box>
              <Text mb={3}>Color</Text>
              <RadioGroup value={color}>
                <Stack direction='row' spacing={4}>
                  <Radio {...register('color')} value='red'>red</Radio>
                  <Radio {...register('color')} value='blue'>blue</Radio>
                  <Radio {...register('color')} value='green'>green</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            {/*
            <Box mt={4}>
              <Stack direction="column" spacing={4}>
                <Box>
                  <Text mb={3}>1</Text>
                  <TextAreaElement {...register('first')} required />
                </Box>
                <Box>
                  <Text mb={3}>2</Text>
                  <TextAreaElement {...register('second')} required />
                </Box>
                <Box>
                  <Text mb={3}>3</Text>
                  <TextAreaElement {...register('third')} required />
                </Box>
                <Box>
                  <Text mb={3}>4</Text>
                  <TextAreaElement {...register('forth')} required />
                </Box>
                <Box>
                  <Text mb={3}>last</Text>
                  <TextAreaElement {...register('last')} required />
                </Box>
              </Stack>
            </Box>
             */}
            <Box mt={4}>
              <Text mb={3}>Caption</Text>
              <Box borderWidth='1px' borderRadius='lg' p={4}>
                <Stack direction="column" spacing={4} ref={textRef}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{firstWatch}</ReactMarkdown>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{secondWatch}</ReactMarkdown>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{thirdWatch}</ReactMarkdown>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{forthWatch}</ReactMarkdown>
                </Stack>
              </Box>
              <div className={styles.buttonArea}>
                <Button onClick={handleCopy} type="prime">Copy</Button>
              </div>
            </Box>
          </TabPanel>
          <TabPanel>
            <CreatePost color={color} type="question" fieldName='first' />
          </TabPanel>
          <TabPanel>
            <CreatePost color={color} type="research" fieldName='second' />
          </TabPanel>
          <TabPanel>
            <CreatePost color={color} type="startled" fieldName='third' />
          </TabPanel>
          <TabPanel>
            <CreatePost color={color} type="creativity" fieldName='forth' />
          </TabPanel>
          <TabPanel>
            <CreatePost
              color={color}
              type="welcome"
              fieldName='last'
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormProvider>
  )
}
