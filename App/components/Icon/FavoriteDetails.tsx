import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import colors from '../../styles/colors';
type TProps = {
  isClicked: boolean;
  isDisable: boolean;
};
function FavoriteDetails({isClicked, isDisable, ...props}: TProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={isDisable && colors.grey_super_light}
      strokeWidth={0.5}
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d={
          isClicked
            ? 'M7.33 2.384c1.017 0 2.019.246 2.92.719A6.33 6.33 0 0112 4.458a6.29 6.29 0 014.67-2.074c3.502 0 6.33 2.865 6.33 6.387 0 3.119-1.815 6.019-4.005 8.252-2.195 2.238-4.87 3.915-6.797 4.561a.622.622 0 01-.396 0c-1.927-.646-4.602-2.323-6.797-4.561C2.815 14.79 1 11.89 1 8.77c0-3.522 2.828-6.387 6.33-6.387z'
            : 'M7.33 2.384c1.017 0 2.019.246 2.92.719A6.33 6.33 0 0112 4.458a6.29 6.29 0 014.67-2.074c3.502 0 6.33 2.865 6.33 6.387 0 3.119-1.815 6.019-4.005 8.252-2.195 2.238-4.87 3.915-6.797 4.561a.622.622 0 01-.396 0c-1.927-.646-4.602-2.323-6.797-4.561C2.815 14.79 1 11.89 1 8.77c0-3.522 2.828-6.387 6.33-6.387zm2.342 1.822a5.033 5.033 0 00-2.341-.577c-2.803 0-5.086 2.296-5.086 5.142 0 2.645 1.558 5.247 3.649 7.38C7.9 18.197 10.302 19.712 12 20.334c1.698-.622 4.1-2.137 6.106-4.183 2.091-2.133 3.649-4.735 3.649-7.38 0-2.846-2.283-5.142-5.085-5.142-1.717 0-3.237.86-4.16 2.183a.623.623 0 01-1.021 0 5.096 5.096 0 00-1.817-1.606z'
        }
        fill={
          !isClicked
            ? isDisable && colors.grey_super_light
            : colors.red_bookmarks
        }
      />
    </Svg>
  );
}

export default FavoriteDetails;