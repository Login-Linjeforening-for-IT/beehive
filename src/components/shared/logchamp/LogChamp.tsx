import DecoratedPicture from "@components/shared/images/decoratedpicture/DecoratedPicture"
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
                imgUrl={img}
                variant={Math.ceil(Math.random() * 4)}
                cornerSize={36}
                width={100}
                height={100}
            />
            <div className='logchamp_info'>
                <p className='logchamp_title'>{position}</p>
                <p className='logchamp_name'>{name}</p>
                {discord &&
          <p className='logchamp_discord'>
              <i className='logfont-discord'> </i>
              <a href={discordLink} target='_blank'>{discord}</a>
          </p>
                }
            </div>
        </div>
    )
}
