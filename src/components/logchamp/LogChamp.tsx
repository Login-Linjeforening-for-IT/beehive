import DecoratedPicture from "../images/decoratedpicture/DecoratedPicture"
import "./LogChamp.css"

type LogChampProps = {
  name: string
  position: string
  img: string
  discord: string
  discordLink: string
}

export default function LogChamp({name, position, img, discord, discordLink}: LogChampProps) {
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
                <p className='logchamp__title'>{position}</p>
                <p className='logchamp__name'>{name}</p>
                {discord &&
          <p className='logchamp__discord'>
              <i className='logfont-discord'> </i>
              <a href={discordLink} target='_blank'>{discord}</a>
          </p>
                }
            </div>
        </div>
    )
}
