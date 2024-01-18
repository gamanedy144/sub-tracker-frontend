import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({ config });

export default theme;

export const typeColors = {
  ['daily']: 'gray',
  ['weekly']: 'orange',
  ['monthly']: 'blue',
  ['bimonthly']: 'green',
  ['yearly']: 'purple',
};
