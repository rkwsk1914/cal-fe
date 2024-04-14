import * as React from 'react'
import '../src/styles/Tailwind.css';
import './assets/reset.css';
import { ThemBtn } from './assets/themBtn';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './../src/const/DarkTheme';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...MINIMAL_VIEWPORTS,
    },
    defaultViewport: 'iphone14'
  }
};

export const decorators = [
  (Story, context) => {
    return (
      <ChakraProvider theme={theme}>
        <ThemBtn />
        <Story />
      </ChakraProvider>
    )
  },
];
