import { GridItem } from '@chakra-ui/react';
import React from 'react';
import ColorModeSwitch from './ColorModeSwitch';

const Settings = () => {
  return (
    <GridItem>
      <ColorModeSwitch />
      <div>Settings</div>
    </GridItem>
  );
};

export default Settings;
