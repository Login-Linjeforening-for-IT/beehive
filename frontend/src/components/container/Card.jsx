const Card = ({title,body}) => {
  return (
    <div>
      <h2 className='heading-2' dangerouslySetInnerHTML={{__html: title}} />
      <p className='p--regular' dangerouslySetInnerHTML={{__html: body}} />
    </div>
  );
}

export default Card
