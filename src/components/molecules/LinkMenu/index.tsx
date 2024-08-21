import * as React from 'react'

import {
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export type ListItemType = {
  href?: string
  label: string
  subList?: ListItemType[]
}

type Props = {
  list: ListItemType[]
};

export const LinkMenu: React.FC<Props> = (
  {
    list
  }
): JSX.Element => {
  return (
    <UnorderedList>
      {list.map((item) => (
        <React.Fragment key={item.label}>
          <ListItem>
            {item.href ?
              (<Link as={NextLink} href={item.href}>{item.label}</Link>) :
              item.label
            }
            {item.subList && (
              <UnorderedList>
                {item.subList.map((subItem) => (
                  <React.Fragment key={subItem.label}>
                    <ListItem>
                      {subItem.href ?
                        (<Link as={NextLink} href={subItem.href}>{subItem.label}</Link>) :
                        subItem.label
                      }
                    </ListItem>
                  </React.Fragment>
                ))}
              </UnorderedList>
            )}
          </ListItem>
        </React.Fragment>
      ))}
    </UnorderedList>
  )
}
