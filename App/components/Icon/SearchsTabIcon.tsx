import * as React from 'react';
import Svg, {Path,G, Defs, ClipPath } from 'react-native-svg';

function SearchsTabIcon(props: any) {
  return !props.focused ? (
    <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.884 16.927l5.16 5.161a.732.732 0 01-1.034 1.035l-5.16-5.161 1.034-1.035z"
      fill="#1C1C1C"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.25 20.998c5.384 0 9.748-4.364 9.748-9.749 0-5.384-4.364-9.749-9.749-9.749C5.865 1.5 1.5 5.865 1.5 11.25c0 5.384 4.365 9.748 9.75 9.748zm0-1.366a8.383 8.383 0 100-16.766 8.383 8.383 0 000 16.766z"
      fill="#1C1C1C"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.46 14.97l-.47-2.736 1.989-1.937a.345.345 0 00-.192-.59l-2.748-.4-1.228-2.49a.348.348 0 00-.621 0L9.96 9.308l-2.748.4a.346.346 0 00-.192.59l1.989 1.937-.47 2.736a.346.346 0 00.502.365l2.458-1.292 2.458 1.292a.346.346 0 00.502-.365zM11.5 7.318l-1.207 2.446-2.7.392 1.954 1.904-.461 2.687 2.414-1.269 2.415 1.27-.462-2.688 1.954-1.904-2.7-.392L11.5 7.318z"
      fill="#1C1C1C"
      stroke="#1C1C1C"
      strokeWidth={0.6}
    />
  </Svg>
  ) : (
    <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_1292_6703)">
      <Path
        d="M19.012 17.631a10.008 10.008 0 002.286-6.382C21.298 5.7 16.8 1.2 11.25 1.2S1.2 5.7 1.2 11.25c0 5.55 4.5 10.048 10.05 10.048 2.383 0 4.573-.83 6.296-2.216l4.252 4.253a1.031 1.031 0 001.459-1.459l-4.245-4.245zm.32-6.382a8.083 8.083 0 11-16.166 0 8.083 8.083 0 0116.166 0z"
        fill="#5057F4"
        stroke="#5057F4"
        strokeWidth={0.6}
      />
    </G>
    <Path
      d="M15.787 9.706l-2.748-.4-1.229-2.488a.348.348 0 00-.621 0L9.961 9.307l-2.748.4a.346.346 0 00-.192.59l1.988 1.937-.47 2.736a.346.346 0 00.503.365l2.458-1.292 2.458 1.292a.346.346 0 00.502-.365l-.47-2.736 1.989-1.937a.345.345 0 00-.192-.59z"
      fill="#5057F4"
    />
    <Defs>
      <ClipPath id="clip0_1292_6703">
        <Path fill="#fff" d="M0 0H24V24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
  );
}

export default SearchsTabIcon;