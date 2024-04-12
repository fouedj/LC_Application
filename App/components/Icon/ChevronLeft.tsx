import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styled} from 'nativewind';
import classNames from 'classnames';
import Text from '../Text';
type Props = {
  showLeftTitle?: boolean;
  leftTitle?: string;
  overrideBackBtn?: () => void;
};
const Touchable = styled(TouchableOpacity);
const ChevronLeft = (props: any) => {
  const navigation = useNavigation();

  return (
    <Touchable
      onPress={() => {
        props.overrideBackBtn ? props.overrideBackBtn() : navigation.goBack();
      }}
      className={classNames({
        'flex flex-row items-center ': props.showLeftTitle && props.leftTitle,
        'p-O': true,
      })}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.994 19.994a.875.875 0 01-1.238 0l-7-7a.875.875 0 010-1.238l7-7a.875.875 0 111.238 1.238l-6.382 6.381 6.382 6.381a.875.875 0 010 1.238z"
          fill="#1C1C1C"
        />
      </Svg>
    </Touchable>
  );
};

export default ChevronLeft;
