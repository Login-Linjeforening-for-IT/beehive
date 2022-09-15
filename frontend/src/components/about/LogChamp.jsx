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
          <p><i className="logfont-discord"> </i>{discord}</p>
      }
    </div>
  );
}

 export default LogChamp
  