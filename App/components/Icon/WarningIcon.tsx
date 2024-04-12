import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function WarningIcon(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10 0a10 10 0 1010 10A10.011 10.011 0 0010 0zm0 16a1 1 0 110-2 1 1 0 010 2zm1-4a1 1 0 01-2 0V5a1 1 0 012 0v7z"
        fill="#FC8C00"
      />
    </Svg>
  );
}

export default WarningIcon;
