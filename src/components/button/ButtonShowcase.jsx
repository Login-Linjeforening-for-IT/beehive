import React, { useState } from 'react';
import Button from '../button/Button';
import GroupToggle from '../grouptoggle/GroupToggle';

const ButtonShowcase = () => {
  const variants = ['primary', 'secondary', 'primary-outlined', 'secondary-outlined', 'ghost', 'danger'];
  const sizes = ['small', 'medium', 'large', 'xl'];
  const iconPlacements = ['none', 'leading', 'trailing', 'leading-empty']; // Added 'leading-empty' for empty text with leading icon.

  const renderIcon = (iconName) => <i className="material-symbols-sharp">{iconName}</i>;

  const [activeOptionIndex, setActiveOptionIndex] = useState(0);

  const handleOptionChange = (index) => {
    setActiveOptionIndex(index);
  };

  return (
    <div className="button-showcase">
      <h2 className="button-showcase__title">All Button Combinations by Size</h2>
      {sizes.map((size) => (
        <div key={size} className="button-showcase__size-section">
          <h3>{size.charAt(0).toUpperCase() + size.slice(1)} Buttons</h3>
          <div className="button-showcase__section">
            {variants.map((variant) =>
              iconPlacements.map((placement) => {
                let leadingIcon = null;
                let trailingIcon = null;
                let text = variant; // Only the variant name as text.

                if (placement === 'leading') {
                  leadingIcon = renderIcon('favorite');
                } else if (placement === 'trailing') {
                  trailingIcon = renderIcon('home');
                } else if (placement === 'leading-empty') {
                  leadingIcon = renderIcon('settings');
                  text = ''; // Empty text for this variation.
                }

                return (
                  <Button
                    key={`${variant}-${size}-${placement}`}
                    variant={variant}
                    size={size}
                    leadingIcon={leadingIcon}
                    trailingIcon={trailingIcon}
                  >
                    {text}
                  </Button>
                );
              })
            )}
          </div>
        </div>
      ))}

      {/* Other sections can remain as they were if needed */}
      <h2 className="button-showcase__title">Link Buttons</h2>
      <div className="button-showcase__section">
        <Button isLink href="https://example.com">Link Button</Button>
        <Button isLink href="https://example.com" variant="secondary">Secondary Link</Button>
      </div>

      <h2 className="button-showcase__title">Disabled Buttons</h2>
      <div className="button-showcase__section">
        <Button disabled>Disabled Button</Button>
        <Button disabled variant="secondary">Disabled Secondary</Button>
      </div>

      <div className="button-showcase__section">
        <GroupToggle
          options={[
            { leadingIcon: renderIcon('grid_view') },
            { leadingIcon: renderIcon('filter_list') },
            { leadingIcon: <i className="logfont-satkom-filled"></i> }
          ]}
          activeOptionIndex={activeOptionIndex}
          onOptionChange={handleOptionChange}
          size="small"
          activeVariant="primary-outlined"
          inactiveVariant="ghost"
        />
        <p>Active Option Index: {activeOptionIndex}</p>
      </div>
      <div className="button-showcase__section">
        <Button
          variant='secondary-outlined'
          trailingIcon={<i className='material-symbols-sharp'>replay</i>}
        >
          Filter
        </Button>
        <GroupToggle
          options={[
            { leadingIcon: renderIcon('grid_view') },
            { leadingIcon: renderIcon('filter_list') }
          ]}
          activeOptionIndex={activeOptionIndex}
          onOptionChange={handleOptionChange}
          size="medium"
          activeVariant="primary-outlined"
          inactiveVariant="secondary-outlined"
        />
        <p>Active Option Index: {activeOptionIndex}</p>
      </div>
      <div className="button-showcase__section">
        <GroupToggle
          options={[
            { leadingIcon: renderIcon('grid_view') },
            { leadingIcon: renderIcon('filter_list') },
            { leadingIcon: <i className="logfont-satkom-filled"></i> }
          ]}
          activeOptionIndex={activeOptionIndex}
          onOptionChange={handleOptionChange}
          size="large"
          activeVariant="primary-outlined"
          inactiveVariant="ghost"
        />
        <p>Active Option Index: {activeOptionIndex}</p>
      </div>
      <div className="button-showcase__section">
        <GroupToggle
          options={[
            { leadingIcon: renderIcon('grid_view') },
            { leadingIcon: renderIcon('filter_list') },
            { leadingIcon: <i className="logfont-satkom-filled"></i> }
          ]}
          activeOptionIndex={activeOptionIndex}
          onOptionChange={handleOptionChange}
          size="xl"
          activeVariant="primary"
          inactiveVariant="secondary"
        />
        <p>Active Option Index: {activeOptionIndex}</p>
      </div>
    </div>
  );
};

export default ButtonShowcase;
