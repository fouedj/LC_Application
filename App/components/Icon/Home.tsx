import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HomeIcon(props: any) {
  return (
    <Svg
      width={24}
      height={23}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {props.focused ? (
        <Path
          testID="home-icons-clicked"
          d={
            'M22.8 11.4L12.5 1.2c-.3-.3-.7-.3-1 0L1.2 11.4c-.3.3-.3.7 0 1 .1.1.3.2.5.2s.4-.1.5-.2l.8-.8v7.3C3 21.2 4.9 23 7.1 23h9.7c2.3 0 4.1-1.8 4.1-4.1v-7.3l.8.8c.3.3.7.3 1 0 .4-.2.4-.7.1-1z'
          }
          fill="#5057F4"
        />
      ) : (
        <Path
          testID="home-icons-not-clicked"
          d="M11.504 1.203a.73.73 0 00-1.014 0L.21 11.432a.721.721 0 000 1.009.708.708 0 00.5.213c.18 0 .37-.07.502-.213l9.792-9.73 9.78 9.73a.73.73 0 001.014 0 .721.721 0 000-1.009L11.504 1.203zM19.245 13.034a.716.716 0 00-.716.712v5.174a2.668 2.668 0 01-2.671 2.658H6.136a2.668 2.668 0 01-2.672-2.658v-5.174a.716.716 0 00-1.431 0v5.174c0 2.254 1.836 4.082 4.103 4.082h9.72c2.255 0 4.104-1.828 4.104-4.082v-5.174a.716.716 0 00-.716-.712z"
          fill="#1C1C1C"
        />
      )}
    </Svg>
  );
}

export default HomeIcon;
