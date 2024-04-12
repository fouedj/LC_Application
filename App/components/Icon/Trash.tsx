import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import colors from '../../styles/colors';

function TrashIcon(props: any) {
  return (
    <Svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.111 1.763H7.207c-.592 0-1.074.518-1.074 1.163v.726h6.06v-.726c0-.637-.482-1.163-1.075-1.163h-.007zm1.348 5.34c.282 0 .4.171.4.453v7.866c0 .282-.118.46-.4.46-.281 0-.4-.178-.4-.46V7.548c0-.281.119-.452.4-.452v.008zm-6.748 0c.282 0 .4.171.4.453v7.866c0 .282-.118.46-.4.46-.281 0-.4-.178-.4-.46V7.548c0-.281.119-.452.4-.452v.008zm3.43-.636c.281 0 .4.192.4.51v8.979c0 .318-.119.526-.4.526-.282 0-.4-.208-.4-.526V6.97c0-.318.118-.518.4-.518v.015zm5.896-2.008H3.2v12.304c0 .963.793 1.755 1.763 1.755h8.296c.97 0 1.763-.785 1.77-1.755V4.452l.008.007zm-4.081-3.444c1.11 0 2.014.904 2.014 2.015v.622h3.815a.512.512 0 010 1.022h-.918v11.94a2.725 2.725 0 01-2.719 2.72h-8a2.72 2.72 0 01-2.718-2.72V4.66H1.51a.512.512 0 010-1.022h3.815v-.622C5.326 1.904 6.23 1 7.34 1h3.622l-.007.015z"
        fill={
          props.isCurrentlyInDeleteMode
            ? colors.grey_super_light
            : colors.blackPro
        }
        stroke={
          props.isCurrentlyInDeleteMode
            ? colors.grey_super_light
            : colors.blackPro
        }
        strokeWidth={0.2}
      />
    </Svg>
  );
}

export default TrashIcon;
