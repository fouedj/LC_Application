import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CloseIcon(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.806 5.994a.75.75 0 011.06 0l10.96 10.96a.75.75 0 01-1.06 1.06L5.806 7.055a.75.75 0 010-1.06z"
        fill="#1C1C1C"
      />
      <Path
        d="M17.827 5.994a.75.75 0 010 1.06l-10.96 10.96a.75.75 0 11-1.061-1.06l10.96-10.96a.75.75 0 011.06 0z"
        fill="#1C1C1C"
      />
    </Svg>
  );
}

export default CloseIcon;
