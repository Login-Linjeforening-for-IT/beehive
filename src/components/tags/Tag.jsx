import './Tags.css';

const Tag = ({ children, variant='info' }) => {
  
  return (
    <div className={`tag tag--${variant}`}>
        <div className="tag__container">
            <div className="tag__name">
                {children}
            </div>
        </div>
    </div>
  )
};

export default Tag;