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
  // 最大の1次元配列の要素数を取得する
  const maxColLength = data.reduce((max, current) => {
    return current.length > max ? current.length : max
  }, 0)

  return (
    <TableContainer
      overflowY="scroll"
      overflowX="scroll"
      className={styles.tableContainer}>
    <ChakuraUITable size='sm'>
      <Thead>
        {data.map((row, rowIndex) => {
          return (rowIndex < thRow) && (
            <Tr key={rowIndex}>
              {[...Array(maxColLength)].map((_col, colIndex) => (
                <Th
                  key={`${rowIndex}-${colIndex}`}
                  className={
                    clsx(
                      styles[`stickyCol${colIndex + 1}`],
                      styles[`stickyRow${rowIndex + 1}`]
                    )}
                >{row[colIndex]}</Th>
              ))}
            </Tr>
          )
        })}
      </Thead>
      <Tbody>
        {data.map((row, rowIndex) => {
          return (thRow && rowIndex >= thRow) && (
            <Tr key={rowIndex}>
              {[...Array(maxColLength)].map((_col, colIndex) => {

                if (thCol > colIndex) {
                  return (
                    <Th
                      key={`${rowIndex}-${colIndex}`}
                      className={clsx(styles[`stickyCol${colIndex + 1}`])}
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
