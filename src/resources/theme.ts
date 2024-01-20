import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({ config });

export default theme;

export const cardColors = {
  ['daily']: 'gray.400',
  ['weekly']: 'orange.300',
  ['monthly']: 'blue.600',
  ['bimonthly']: 'green.500',
  ['yearly']: 'purple.500',
};
export const calendarColors = {
  ['daily']: 'gray',
  ['weekly']: 'orange',
  ['monthly']: 'blue',
  ['bimonthly']: 'green',
  ['yearly']: 'purple',
};
