import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import colors from '../../styles/colors';
type TProps = {
  isDisable: boolean;
};
function ShareIconAndroid({isDisable, ...props}: TProps) {
  const iconColor = isDisable ? colors?.grey_super_light : colors.grey1;
  let isOpacity = isDisable ? 0.2 : 1;

  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={isDisable && 'red'}
      stroke={iconColor}
      strokeWidth={0.5}
      strokeOpacity={isOpacity}
      {...props}>
      <Path
        d="M17.988 15.857c-1.08 0-2.051.5-2.701 1.26l-5.963-3.751c.16-.41.26-.85.26-1.321 0-.47-.1-.92-.26-1.33l5.973-3.822c.66.76 1.61 1.25 2.69 1.25 1.972 0 3.572-1.6 3.572-3.571S19.96 1 17.988 1s-3.572 1.6-3.572 3.572c0 .46.09.89.25 1.29L8.684 9.694c-.65-.74-1.601-1.22-2.672-1.22-1.97 0-3.571 1.6-3.571 3.571 0 1.97 1.6 3.572 3.571 3.572 1.07 0 2.021-.48 2.672-1.23l5.982 3.76c-.15.401-.25.831-.25 1.281 0 1.971 1.6 3.572 3.572 3.572 1.97 0 3.571-1.6 3.571-3.572 0-1.97-1.6-3.571-3.571-3.571zm0-13.646a2.37 2.37 0 012.37 2.37 2.37 2.37 0 01-2.37 2.372 2.37 2.37 0 01-2.371-2.371 2.37 2.37 0 012.37-2.371zM6.012 14.416a2.37 2.37 0 01-2.37-2.371 2.37 2.37 0 012.37-2.371 2.37 2.37 0 012.371 2.371 2.37 2.37 0 01-2.37 2.371zM17.988 21.8a2.37 2.37 0 01-2.371-2.37 2.37 2.37 0 012.37-2.372 2.37 2.37 0 012.372 2.371 2.37 2.37 0 01-2.371 2.371z"
        fill={iconColor}
      />
    </Svg>
  );
}

export default ShareIconAndroid;
