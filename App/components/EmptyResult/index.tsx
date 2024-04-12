import React from 'react';
import mainStyles from '../../styles/styles';
import Box from '../Box';
import Text from '../Text';

interface TEmptyResult {
  messageBody: string;
}
const EmptyResult: React.FC<TEmptyResult> = ({messageBody}) => {
  return (
    <Box style={mainStyles.containerEmptyResult}>
      <Box className="flex-1 items-start w-[246] h-[40] justify-center">
        {messageBody && (
          <Text style={mainStyles.centerTextEmptyResult}>{messageBody}</Text>
        )}
      </Box>
    </Box>
  );
};

export default EmptyResult;
