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
function GoBackIcon(props: Props) {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => {
        props.overrideBackBtn ? props.overrideBackBtn() : navigation.goBack();
      }}
      className={classNames({
        'flex flex-row items-center ': props.showLeftTitle && props.leftTitle,
        'p-2': true,
      })}>
      <Svg
        //@ts-ignore
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-arrow-left"
        testID="GoBack-icons"
        {...props}>
        <Path d="M19 12L5 12" />
        <Path d="M12 19L5 12 12 5" />
      </Svg>
      {props.leftTitle && props.showLeftTitle && (
        <Text className="ml-2 text-lg">{props.leftTitle}</Text>
      )}
    </Touchable>
  );
}

export default GoBackIcon;
