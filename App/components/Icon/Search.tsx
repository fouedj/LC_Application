import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SearchIcons(props: any) {
  const{focused,isWhite}=props
  return !focused ? (
    <Svg
      testID="search-icons-NotClicked"
      width={24}
      height={24}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16.884 15.927l5.16 5.161a.732.732 0 01-1.034 1.035l-5.16-5.161 1.034-1.035z"
        fill={isWhite?"#FFF":"#1C1C1C"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.25 19.998c5.383 0 9.748-4.365 9.748-9.749S15.633.5 10.25.5.5 4.865.5 10.25c0 5.383 4.365 9.748 9.75 9.748zm0-1.366a8.383 8.383 0 100-16.766 8.383 8.383 0 000 16.766z"
        fill={isWhite?"#FFF":"#1C1C1C"}
      />
    </Svg>
  ) : (
    <Svg
      testID="search-icons-clicked"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M19.012 17.631a10.008 10.008 0 002.286-6.382C21.298 5.7 16.8 1.2 11.25 1.2S1.2 5.7 1.2 11.25c0 5.55 4.5 10.048 10.05 10.048 2.383 0 4.573-.83 6.295-2.216l4.253 4.253a1.031 1.031 0 001.459-1.459l-4.245-4.245zm.32-6.382a8.083 8.083 0 11-16.166 0 8.083 8.083 0 0116.166 0z"
        fill="#5057F4"
        stroke="#5057F4"
        strokeWidth={0.6}
      />
    </Svg>
  );
}

export default SearchIcons;
