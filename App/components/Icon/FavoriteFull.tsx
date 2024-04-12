import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.33 2.384c1.017 0 2.019.246 2.92.719A6.33 6.33 0 0112 4.458a6.29 6.29 0 014.67-2.074c3.502 0 6.33 2.865 6.33 6.387 0 3.119-1.815 6.019-4.005 8.252-2.195 2.238-4.87 3.915-6.797 4.561a.622.622 0 01-.396 0c-1.927-.646-4.602-2.323-6.797-4.561C2.815 14.79 1 11.89 1 8.77c0-3.522 2.828-6.387 6.33-6.387z"
        fill="#1C1C1C"
      />
    </Svg>
  )
}

export default SvgComponent
