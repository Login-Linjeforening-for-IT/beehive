import { useState } from 'react'
import Button from '@components/shared/button/Button'
import './GroupToggle.css'

function GroupToggle({ 
    options, 
    activeOptionIndex: controlledActiveOptionIndex, 
    defaultActiveOptionIndex = 0,
    onOptionChange, 
    size = 'medium',
    groupVariant = 'outlined',
    buttonVariant = 'ghost',
    className = '',
    ariaLabel = 'Toggle group'
}: any) {
    const [internalActiveOptionIndex, setInternalActiveOptionIndex] = useState(defaultActiveOptionIndex)
    const activeOptionIndex = controlledActiveOptionIndex !== undefined ? controlledActiveOptionIndex : internalActiveOptionIndex

    function handleOptionChange(index: number) {
        if (controlledActiveOptionIndex === undefined) {
            setInternalActiveOptionIndex(index)
        }
        if (onOptionChange) {
            onOptionChange(index)
        }
    }

    return (
        <div 
            className={`group-toggle group-toggle--${groupVariant} group-toggle--${size} ${className}`}
            role="group"
            aria-label={ariaLabel}
        >
            {options.map((option: any, index: number) => {
                const isActive = activeOptionIndex === index
                const { text, leadingIcon, trailingIcon, ...restButtonProps } = option

                return (
                    <Button
                        key={index}
                        variant={buttonVariant}
                        size={size}
                        onClick={() => handleOptionChange(index)}
                        className={`group-toggle_button ${
                            index === 0 ? 'group-toggle_button--first' : 
                                index === options.length - 1 ? 'group-toggle_button--last' : ''
                        }`}
                        leadingIcon={leadingIcon}
                        trailingIcon={trailingIcon}
                        aria-pressed={isActive}
                        active={isActive}
                        {...restButtonProps}
                    >
                        {text}
                    </Button>
                )
            })}
        </div>
    )
}

export default GroupToggle