import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import colors from '../../styles/colors';
type TProps = {
  isDisable: boolean;
};
function ShareIconIos({isDisable, ...props}: TProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={isDisable && colors.grey_super_light}
      strokeWidth={isDisable && 0.5}
      {...props}>
      <Path
        d="M5.764 7.715a.678.678 0 010-.945l.022.01 5.403-5.402c.244-.245.567-.378.911-.378.345 0 .667.133.912.378l5.403 5.403c.133.122.2.3.2.467a.658.658 0 01-.2.466.678.678 0 01-.945 0l-4.714-4.713v13.04c0 .367-.3.667-.667.667a.669.669 0 01-.667-.667V2.957L6.71 7.715a.678.678 0 01-.945 0z"
        fill={isDisable ? colors.grey_super_light : colors.grey1}
      />
      <Path
        d="M21.627 21.477V11.294c0-.367.3-.667.667-.667.367 0 .667.3.667.667v10.183c0 .845-.689 1.523-1.523 1.523H2.562a1.518 1.518 0 01-1.523-1.523V11.294c0-.367.3-.667.667-.667.367 0 .667.3.667.667v10.183c0 .1.089.189.189.189h18.876c.1 0 .19-.089.19-.19z"
        fill={isDisable ? colors.grey_super_light : colors.grey1}
      />
    </Svg>
  );
}

export default ShareIconIos;
