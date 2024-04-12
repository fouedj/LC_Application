import React from 'react';
import Box from '../Box';
import Text from '../Text';

export default function Footer() {
  return (
    <Box className="bg-blue-900 h-[40]" testID="footerId">
      <Text className="text-white text-xl font-bold text-center ">Footer</Text>
    </Box>
  );
}
