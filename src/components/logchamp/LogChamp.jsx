import './LogChamp.css'
import DecoratedPicture from '../picture/DecoratedPicture'

const LogChamp = ({name, stilling, img, discord, discordlink}) => {

  return (
    <div className='logchamp'>
      <DecoratedPicture imgurl={img} decorationNr={Math.ceil(Math.random() * 4)} cornerSize={36} w={100} h={100} />
      <div className='logchamp__info'>
        <p className='logchamp__title'>{stilling}</p>
        <p className='logchamp__name'>{name}</p>
        {discord !== '' &&
            <p className='logchamp__discord'><i className='logfont-discord'> </i><a href={discordlink}>{discord}</a></p>
        }
      </div>
    </div>
  )
}

 export default LogChamp