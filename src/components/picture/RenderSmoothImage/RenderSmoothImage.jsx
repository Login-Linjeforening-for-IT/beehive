import { useState } from 'react';
import PropTypes from 'prop-types';
import './RenderSmoothImage.css';

function RenderSmoothImage({ src, alt, className, onError, transition }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`smooth-image ${transition ? 'smooth-image--transition' : ''} smooth-image--${imageLoaded ? 'visible' : 'hidden'} ${className}`}
      onLoad={() => setImageLoaded(true)}
      onError={onError}
    />
  );
}

RenderSmoothImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  transition: PropTypes.bool,
  onError: PropTypes.func,
};

RenderSmoothImage.defaultProps = {
  className: '',
  transition: true,
  onError: () => {},
};

export default RenderSmoothImage;