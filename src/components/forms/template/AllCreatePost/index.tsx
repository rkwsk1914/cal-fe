import * as React from 'react'
import { useState, useEffect, useRef } from 'react'


import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Button } from '@chakra-ui/react'
import { Radio, RadioGroup,Stack } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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

  const [isSaveOrRec, setIsSaveOrRec] = useState<'save' | 'rec' | null>(null)

  const { register, watch, getValues, reset, formState: { isValid, isDirty } } = methods
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

  const save = () => {
    const value = getValues()
    localStorage.setItem('instaPost', JSON.stringify(value))
  }

  const clear = () => {
    localStorage.removeItem('instaPost')
    reset({
      color: 'red',
      first: '',
      second: '',
      third: '',
      forth: '',
      last: defaultLastContent
    })
  }

  const handleDownload = () => {
    // 例としてダウンロードする JSON データ
    const data = getValues()

    // JSON オブジェクトを文字列に変換
    const jsonString = JSON.stringify(data)

    // 文字列から Blob を作成
    const blob = new Blob([jsonString], { type: 'application/json' })

    // Blob からダウンロード用の URL を作成
    const url = URL.createObjectURL(blob)

    // ダウンロードリンクを生成し、自動的にクリック
    const link = document.createElement('a')
    link.href = url
    link.download = 'data.json'
    document.body.appendChild(link)
    link.click()

    // 不要になったリンクと URL を後処理
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

  const doReconstruction = () => {
    const storageValue = localStorage.getItem('instaPost')
    const sessionDefaultValue = storageValue ? JSON.parse(storageValue) : null
    reset(sessionDefaultValue)
    setIsSaveOrRec('save')
    setColor(sessionDefaultValue.color)
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        const file = event.target.files[0]
        const text = await file.text()
        const jsonData = JSON.parse(text)
        reset(jsonData)
        setColor(jsonData.color)
    }
}

  useEffect(() => {
    if (isDirty) setIsSaveOrRec('save')
  }, [isDirty])

  useEffect(() => {
    setColor(colorWatch as 'red' | 'green' | 'blue')
  }, [colorWatch, setColor])

  useEffect(() => {
    if (isSaveOrRec !== null) return

    const storageValue = localStorage.getItem('instaPost')
    const sessionDefaultValue = storageValue ? JSON.parse(storageValue) : null
    sessionDefaultValue ?
      setIsSaveOrRec('rec') :
      setIsSaveOrRec('save')
  }, [isSaveOrRec])

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
            <Box mt={4}>
              <Text mb={3}>Caption</Text>
              <div className={styles.buttonArea}>
                <Button
                  onClick={() => {
                    isSaveOrRec === 'rec' ? doReconstruction() : save()
                  }}
                  colorScheme='blue'
                >
                  {isSaveOrRec === 'rec' ? '復元' : '保存'}
                </Button>
                <Button onClick={handleCopy} colorScheme='blue' disabled={!isValid}>コピー</Button>
              </div>
              <div className={styles.buttonArea}>
                <Button onClick={clear} colorScheme='blue'>クリア</Button>
                <Button onClick={handleDownload} colorScheme='blue'>JSON</Button>
              </div>
              <Box borderWidth='1px' borderRadius='lg' p={4}>
                <Stack direction="column" spacing={4} ref={textRef}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{firstWatch}</ReactMarkdown>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{secondWatch}</ReactMarkdown>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{thirdWatch}</ReactMarkdown>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{forthWatch}</ReactMarkdown>
                </Stack>
              </Box>
              <Box mt={8}>
              <input type="file" onChange={handleFileChange} />
              </Box>
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
