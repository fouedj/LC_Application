import React from 'react';
import Box from '../Box';

type Props = {
  children: React.ReactNode;
};
export default function Container({children}: Props) {
  return (
    <Box className="flex-1 " testID="ContainerId">
      {children}
    </Box>
  );
}
