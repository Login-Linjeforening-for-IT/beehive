import './Container.css'

const ContentContainer = (props) => {
  return (
    <div className="ContentContainer">
      <props.component />
    </div>
  ) 
}

export default ContentContainer;
