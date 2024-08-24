import * as React from 'react'

import {
  Table as ChakuraUITable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import clsx from 'clsx'

import { useGetDarkModeStyleClass } from '@/hooks/useGetDarkModeStyleClass'

import styles from './style.module.scss'

type Props = {
  data: Array<Array<string | boolean | number | React.ReactNode>>
  thCol?: number
  thRow?: number
}

export const Table: React.FC<Props> = (
  {
    data,
    thCol = 0,
    thRow = 0
  }
): JSX.Element => {
  const containerClassName = useGetDarkModeStyleClass(styles.tableContainer, styles.dark)

  // 最大の1次元配列の要素数を取得する
  const maxColLength = data.reduce((max, current) => {
    return current.length > max ? current.length : max
  }, 0)

  return (
    <TableContainer
      overflowY="scroll"
      overflowX="scroll"
      className={clsx(containerClassName, {
        [styles.even]: thRow % 2 === 0,
        [styles.odd]: thRow % 2 === 1
      })}>
    <ChakuraUITable size='sm' variant='unstyled'>
      <Thead>
        {data.map((row, rowIndex) => {
          return (rowIndex < thRow) && (
            <Tr key={rowIndex}>
              {[...Array(maxColLength)].map((_col, colIndex) => (
                <Th
                  key={`${rowIndex}-${colIndex}`}
                  className={
                    clsx(
                      styles[`stickyRow${rowIndex + 1}`],
                      {
                        [styles[`stickyCol${colIndex + 1}`]]: colIndex < thCol,
                        [styles.stickyThRowLast]: rowIndex + 1 === thRow,
                        [styles.stickyThColLast]: colIndex + 1 === thCol,
                      }
                    )}
                >{row[colIndex]}</Th>
              ))}
            </Tr>
          )
        })}
      </Thead>
      <Tbody>
        {data.map((row, rowIndex) => {
          return (rowIndex >= thRow) && (
            <Tr key={rowIndex}>
              {[...Array(maxColLength)].map((_col, colIndex) => {

                if (colIndex < thCol) {
                  return (
                    <Th
                      key={`${rowIndex}-${colIndex}`}
                      className={clsx(
                        styles[`stickyCol${colIndex + 1}`],
                        {
                          [styles.stickyThColLast]: colIndex + 1 === thCol,
                        }
                      )}
                    >{row[colIndex]}</Th>
                  )
                }

                return (
                  <Td key={`${rowIndex}-${colIndex}`}>{row[colIndex]}</Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </ChakuraUITable>
  </TableContainer>
  )
}
