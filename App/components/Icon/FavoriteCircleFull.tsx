import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function FavoriteCircleFull(props: any) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle opacity={0.9} cx={20} cy={20} r={20} fill="#F84A4A" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.33 10.384c1.017 0 2.019.246 2.92.719A6.33 6.33 0 0120 12.458a6.29 6.29 0 014.67-2.074c3.502 0 6.33 2.865 6.33 6.387 0 3.119-1.815 6.019-4.005 8.252-2.195 2.238-4.87 3.915-6.797 4.561a.622.622 0 01-.396 0c-1.927-.646-4.602-2.323-6.797-4.561C10.815 22.79 9 19.89 9 16.77c0-3.522 2.829-6.387 6.33-6.387z"
        fill="#fff"
      />
    </Svg>
  );
}

export default FavoriteCircleFull;
