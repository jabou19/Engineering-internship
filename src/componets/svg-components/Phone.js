import * as React from "react"
import Svg, {G,Rect,Circle,Path} from "react-native-svg";
const PhoneSvg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={26} height={48} {...props}>
    <G data-name="Group 113" transform="translate(-42 -265)">
      <Rect
        width={26}
        height={48}
        fill="#1c4b3d"
        data-name="Rectangle 200"
        rx={3}
        transform="translate(42 265)"
      />
      <G
        fill="#dae2e0"
        stroke="#dae2e0"
        data-name="Ellipse 55"
        transform="translate(54 308)"
      >
        <Circle cx={1.5} cy={1.5} r={1.5} stroke="none" />
        <Circle cx={1.5} cy={1.5} r={1} fill="none" />
      </G>
      <G fill="#dae2e0" stroke="#dae2e0" data-name="Rectangle 201">
        <Path stroke="none" d="M44 269h22v37H44z" />
        <Path fill="none" d="M44.5 269.5h21v36h-21z" />
      </G>
    </G>
  </Svg>
)
export default PhoneSvg;
