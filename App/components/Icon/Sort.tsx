import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function SortIcon(props: any) {
  return (
    <Svg
      width={18}
      height={12}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect
        width={6}
        height={1.2}
        rx={0.6}
        transform="matrix(1 0 0 -1 6 11.6)"
        fill="#1C1C1C"
      />
      <Rect
        width={12}
        height={1.2}
        rx={0.6}
        transform="matrix(1 0 0 -1 3 6.4)"
        fill="#1C1C1C"
      />
      <Rect
        width={18}
        height={1.2}
        rx={0.6}
        transform="matrix(1 0 0 -1 0 1.2)"
        fill="#1C1C1C"
      />
    </Svg>
  );
}

export default SortIcon;
