import './ButtonGroup.css';

const ButtonGroup = ({ children, className = '', vertical = false }) => {
  return (
    <div className={`button-group ${vertical ? 'button-group--vertical' : ''} ${className}`}>
      {React.Children.map(children, (child, index) => 
        React.cloneElement(child, { 
          className: `${child.props.className || ''} button-group__item`
        })
      )}
    </div>
  );
};

export default ButtonGroup;