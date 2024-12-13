import * as React from "react"
import Svg, {G,Path,Defs,Pattern,Image} from "react-native-svg";
const HouseSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={51}
    height={51}
    {...props}
  >
    <Defs>
      <Pattern
        id="a"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 103 102"
      >
        <Image
          xlinkHref="data:image/png;base64,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"
          width={103}
          height={102}
        />
      </Pattern>
    </Defs>
    <G data-name="Group 113">
      <Path fill="url(#a)" d="M0 0h51v51H0z" data-name="Exclusion 2" />
    </G>
  </Svg>
)
export default HouseSvg;