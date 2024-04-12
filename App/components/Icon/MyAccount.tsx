import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function MyAccountIcons(props: any) {
  return props.focused ? (
    <Svg
      testID="myAccount-icons-clicked"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.643 11.681a5.34 5.34 0 110-10.682 5.34 5.34 0 010 10.682zM3.67 23a.56.56 0 00.013 0h15.96v-.001a.685.685 0 00.643-.682c0-5.227-3.872-9.474-8.643-9.474C6.872 12.843 3 17.09 3 22.317c0 .362.286.66.643.682h.027z"
        fill="#5057F4"
      />
    </Svg>
  ) : (
    <Svg
      testID="myAccount-icons-notClicked"
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9 10.681A5.34 5.34 0 119 0 5.34 5.34 0 019 10.68zm0-9.314A3.985 3.985 0 005.026 5.34 3.985 3.985 0 009 9.315a3.985 3.985 0 003.974-3.974A3.985 3.985 0 009 1.367zM16.96 22a.685.685 0 01-.684-.683c0-4.475-3.268-8.108-7.276-8.108s-7.276 3.633-7.276 8.108A.685.685 0 011.04 22a.685.685 0 01-.683-.683c0-5.227 3.872-9.474 8.643-9.474 4.771 0 8.643 4.247 8.643 9.474a.685.685 0 01-.683.683z"
        fill="#1C1C1C"
      />
    </Svg>
  );
  //
}
