import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
import colors from '../../styles/colors';
type Props = {
  checked: boolean;
};
function RadioButtonIcon(props: Props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      //@ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={8} cy={8} r={7.5} stroke={props?.checked ? colors.lc_blue : colors.grey2}/>
      {props?.checked && <Circle cx={8} cy={8} r={5} fill={colors.lc_blue} />}
    </Svg>
  );
}

export default RadioButtonIcon;
