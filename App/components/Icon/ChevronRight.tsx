import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const ChevronRight = (props: any) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={props.style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G id="Arrows &#38; user interface / Chevron Right">
        <Path
          id="icon"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.75628 4.75628C8.09799 4.41457 8.65201 4.41457 8.99372 4.75628L15.9937 11.7563C16.3354 12.098 16.3354 12.652 15.9937 12.9937L8.99372 19.9937C8.65201 20.3354 8.09799 20.3354 7.75628 19.9937C7.41457 19.652 7.41457 19.098 7.75628 18.7563L14.1376 12.375L7.75628 5.99372C7.41457 5.65201 7.41457 5.09799 7.75628 4.75628Z"
          fill={props.color}
        />
      </G>
    </Svg>
  );
};

export default ChevronRight;
