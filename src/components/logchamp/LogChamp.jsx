import DecoratedPicture from '../images/decoratedpicture/DecoratedPicture';
import './LogChamp.css';


export default function LogChamp({name, stilling, img, discord, discordlink}) {

  return (
    <div className='logchamp'>
      <DecoratedPicture
        imgurl={img}
        variant={Math.ceil(Math.random() * 4)}
        cornerSize={36}
        w={100}
        h={100}
      />
      <div className='logchamp__info'>
        <p className='logchamp__title'>{stilling}</p>
        <p className='logchamp__name'>{name}</p>
        {discord &&
          <p className='logchamp__discord'>
            <i className='logfont-discord'> </i>
            <a href={discordlink} target='_blank'>{discord}</a>
          </p>
        }
      </div>
    </div>
  )
}
