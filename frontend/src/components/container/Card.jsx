const Card = ({data}) => {
  return (
    <div className="Card">
      <h2 dangerouslySetInnerHTML={{__html: data.title}} />
      <p dangerouslySetInnerHTML={{__html: data.text}} />
    </div>
  );
}

export default Card
