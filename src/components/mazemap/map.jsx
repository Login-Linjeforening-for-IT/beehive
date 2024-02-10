import './mazemap.css';

const MazeMap = ({campusID, poi}) => {

	return (
		<>
			{campusID && poi &&
				<iframe
					title='mazemap'
					className='mazemap'
					src={`https://use.mazemap.com/embed.html?newtablink=false#v=1&campusid=${campusID}&sharemode=false&sharepoitype=poi&utm_medium=iframe&zoom=17&sharepoi=${poi}&lang=nb`}
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
