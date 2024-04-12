import {styled} from 'nativewind';
import React from 'react';
import {Text as RNText} from 'react-native';
const StyledText = styled(RNText);
const Text = ({children, ...props}: any) => {
  return (
    <StyledText
      {...props}
      style={[
        props.style,
        {fontFamily: props.fontFamily || 'OpenSans-Regular'},
      ]}>
      {children}
    </StyledText>
  );
};
export default Text;
