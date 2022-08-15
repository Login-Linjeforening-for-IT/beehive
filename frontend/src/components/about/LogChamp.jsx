const LogChamp = ({name, stilling, img, discord}) => {
  return (
    <div className="LogChamp">
      <picture className="ProfilePic">
        <source srcSet={img} />
        <img alt={img} />
      </picture>
      <p>{stilling}</p>
      <p>{name}</p>
      {discord !== '' &&
        <div className="DiscordTag">
          <picture>
            <source srcSet={process.env.PUBLIC_URL + '/icons/Discord_logo.svg'} />
            <img alt="Discord's logo" />
          </picture>
          <p>{discord}</p>
        </div>
      }
    </div>
  );
}

 export default LogChamp
  