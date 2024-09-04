import { useState } from 'react';
import Button from '../button/Button';
import './GroupToggle.css';

const GroupToggle = ({ 
  options, 
  activeOptionIndex: controlledActiveOptionIndex, 
  defaultActiveOptionIndex = 0,
  onOptionChange, 
  size = 'medium',
  variant = 'outlined',
  activeVariant = 'primary', 
  inactiveVariant = 'ghost',
  className = '',
  ariaLabel = 'Toggle group'
}) => {
  const [internalActiveOptionIndex, setInternalActiveOptionIndex] = useState(defaultActiveOptionIndex);
  const activeOptionIndex = controlledActiveOptionIndex !== undefined ? controlledActiveOptionIndex : internalActiveOptionIndex;

  const handleOptionChange = (index) => {
    if (controlledActiveOptionIndex === undefined) {
      setInternalActiveOptionIndex(index);
    }
    if (onOptionChange) {
      onOptionChange(index);
    }
  };

  return (
    <div 
      className={`group-toggle group-toggle--${variant} group-toggle--${size} ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option, index) => {
        const isActive = activeOptionIndex === index;
        const { text, leadingIcon, trailingIcon, ...restButtonProps } = option;

        return (
          <Button
            key={index}
            variant={isActive ? activeVariant : inactiveVariant}
            size={size}
            onClick={() => handleOptionChange(index)}
            className={`group-toggle__button ${
              index === 0 ? 'group-toggle__button--first' : 
              index === options.length - 1 ? 'group-toggle__button--last' : ''
            }`}
            leadingIcon={leadingIcon}
            trailingIcon={trailingIcon}
            aria-pressed={isActive}
            active={isActive}
            {...restButtonProps}
          >
            {text}
          </Button>
        );
      })}
    </div>
  );
};

export default GroupToggle;