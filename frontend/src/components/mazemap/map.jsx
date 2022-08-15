import { useEffect } from 'react';

const getPOIType = (ref) => {
	if (ref.search(",") < 0 ) {
		return "poi"
	}
	return "point"
}

const MazeMap = (props) => {
	return (
		<>
			{props.mazeref &&
			<iframe src={"https://use.mazemap.com/embed.html?newtablink=false#v=1&campusid=55&sharemode=false&sharepoitype=" + getPOIType(props.mazeref) + "&utm_medium=iframe&zoom=17&sharepoi=" + props.mazeref} width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0"
  scrolling="no" />
			}
	</>
	)
}

export default MazeMap;
