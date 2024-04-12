import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CheckedIcon(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm3.535 6.381l-4.95 4.95-2.12-2.121a1 1 0 00-1.415 1.414l2.758 2.758a1.1 1.1 0 001.556 0l5.586-5.586a1 1 0 00-1.415-1.415z"
        fill="#50BF90"
      />
    </Svg>
  );
}

export default CheckedIcon;
