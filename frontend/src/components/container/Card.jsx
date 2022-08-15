const Card = ({data}) => {
  return (
    <div className="Card">
      <h2>{data.title}</h2>
      <p>{data.text}</p>
    </div>
  );
}

export default Card
