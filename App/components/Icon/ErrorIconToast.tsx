import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ErrorIconToast(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.988 20C15.514 20 20 15.539 20 10.012 20 4.486 15.514 0 9.988 0 4.46 0 0 4.486 0 10.012A9.974 9.974 0 009.988 20zm0-8.476l2.924 2.925c.991.99 2.528-.52 1.512-1.537l-2.9-2.9 2.9-2.924c1.016-.991-.52-2.528-1.512-1.512l-2.924 2.9-2.9-2.9c-1.016-1.016-2.528.52-1.537 1.512l2.925 2.924-2.925 2.9c-.99 1.016.52 2.528 1.537 1.537l2.9-2.925z"
        fill="#F84A4A"
      />
    </Svg>
  );
}

export default ErrorIconToast;
