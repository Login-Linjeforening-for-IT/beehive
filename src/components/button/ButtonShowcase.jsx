import React, { useState } from 'react';
import Button from '../button/Button';
import GroupToggle from '../grouptoggle/GroupToggle';

function ButtonShowcase() {
  const variants = ['primary', 'secondary', 'primary-outlined', 'secondary-outlined', 'ghost', 'danger'];
  const sizes = ['small', 'medium', 'large', 'xl'];
  const iconPlacements = ['none', 'leading', 'trailing', 'leading-empty']; // Added 'leading-empty' for empty text with leading icon.

  const renderIcon = (iconName) => <i className="material-symbols-sharp">{iconName}</i>;

  const [activeOptionIndex, setActiveOptionIndex] = useState(0);

  function handleOptionChange(index) {
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

      <h2 className="button-showcase__title">Group Toggles</h2>
      <div className="button-showcase__section">
        <GroupToggle
          options={[
            { leadingIcon: renderIcon('grid_view'), text:"leading icon" },
            { trailingIcon: renderIcon('filter_list'), text:"trailing icon" },
            { leadingIcon: <i className="logfont-login"></i>, text:"logfont icon" }
          ]}
          activeOptionIndex={activeOptionIndex}
          onOptionChange={handleOptionChange}
          size="small"
        />
      </div>
      <div className="button-showcase__section">
        <GroupToggle
          options={[
            { text:"Ghost" },
            { text:"Ghost" }
          ]}
          activeOptionIndex={activeOptionIndex}
          onOptionChange={handleOptionChange}
          size="medium"
          buttonVariant="secondary-outlined"
          groupVariant="ghost"
        />
      </div>
      <div className="button-showcase__section">
        <GroupToggle
          options={[
            { leadingIcon: renderIcon('grid_view'), text:"large" },
            { leadingIcon: renderIcon('filter_list') }
          ]}
          activeOptionIndex={activeOptionIndex}
          onOptionChange={handleOptionChange}
          size="large"
          buttonVariant="ghost"
          groupVariant="ghost"
        />
      </div>
      <div className="button-showcase__section">
        <GroupToggle
          options={[
            { leadingIcon: renderIcon('grid_view'), text:"xl" },
            { leadingIcon: renderIcon('filter_list') },
            { leadingIcon: <i className="logfont-satkom-filled"></i> }
          ]}
          activeOptionIndex={activeOptionIndex}
          onOptionChange={handleOptionChange}
          size="xl"
        />
      </div>
      <p>Active Option Index: {activeOptionIndex}</p>
    </div>
  );
};

export default ButtonShowcase;
