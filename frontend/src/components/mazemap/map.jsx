import './mazemap.css';

const getPOIType = (ref) => {
	if (ref.search(',') < 0 ) {
		return 'poi'
	}
	return 'point'
}

const MazeMap = (props) => {
	return (
		<>
			{props.mazeref &&
				<iframe
					className='mazemap'
					src={'https://use.mazemap.com/embed.html?newtablink=false#v=1&campusid=55&sharemode=false&sharepoitype=' + getPOIType(props.mazeref) + '&utm_medium=iframe&zoom=17&sharepoi=' + props.mazeref + '&lang=' + props.language}
					width='100%'
					height='100%'
					frameBorder='0'
					marginHeight='0'
					marginWidth='0'
					scrolling='no'
				/>
			}
		</>
	)
}

export default MazeMap;
