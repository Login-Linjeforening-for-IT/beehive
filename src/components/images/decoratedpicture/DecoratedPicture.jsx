import { useState, useEffect } from 'react';
import './DecoratedPicture.css';

const DecoratedPicture = ({ imgurl, variant, w, h, cornerSize, cover = false, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const maskID = `mask-${variant}-${w}-${h}`;

  useEffect(() => {
    const img = new Image();
    img.src = imgurl;
    img.onload = () => setIsLoaded(true);
  }, [imgurl]);

  const renderDecorations = () => {
    switch (variant) {
      case 1:
        return (
          <>
            <clipPath id={maskID}>
              <polygon
                points={`0,${cornerSize} ${cornerSize / 3},${cornerSize} ${
                  cornerSize / 3
                },${cornerSize / 3} ${cornerSize},${cornerSize / 3} ${cornerSize},0 ${w},0 ${w},${h} 0,${h}`}
              />
            </clipPath>
            <rect
              className="decor-pic__rect"
              x="0"
              y="0"
              width={cornerSize - (cornerSize / 3) * 0.5}
              height={(cornerSize / 3) * 0.5}
            />
            <rect
              className="decor-pic__rect"
              x="0"
              y="0"
              width={(cornerSize / 3) * 0.5}
              height={cornerSize - (cornerSize / 3) * 0.5}
            />
          </>
        );
      case 2:
        return (
          <>
            <clipPath id={maskID}>
              <polygon
                points={`0,0 ${w - cornerSize},0 ${w - cornerSize},${
                  cornerSize / 3
                } ${w - cornerSize / 3},${cornerSize / 3} ${
                  w - cornerSize / 3
                },${cornerSize} ${w},${cornerSize} ${w},${h} 0,${h}`}
              />
            </clipPath>
            <rect
              className="decor-pic__rect"
              x={w - cornerSize + (cornerSize / 3) * 0.5}
              y="0"
              width={cornerSize - (cornerSize / 3) * 0.5}
              height={(cornerSize / 3) * 0.5}
            />
            <rect
              className="decor-pic__rect"
              x={w - (cornerSize / 3) * 0.5}
              y="0"
              width={(cornerSize / 3) * 0.5}
              height={cornerSize - (cornerSize / 3) * 0.5}
            />
          </>
        );
      case 3:
        return (
          <>
            <clipPath id={maskID}>
              <polygon
                points={`0,0 ${w},0 ${w},${h - cornerSize} ${
                  w - cornerSize / 3
                },${h - cornerSize} ${w - cornerSize / 3},${
                  h - cornerSize / 3
                } ${w - cornerSize},${h - cornerSize / 3} ${w - cornerSize},${h} 0,${h}`}
              />
            </clipPath>
            <rect
              className="decor-pic__rect"
              x={w - cornerSize + (cornerSize / 3) * 0.5}
              y={h - (cornerSize / 3) * 0.5}
              width={cornerSize - (cornerSize / 3) * 0.5}
              height={(cornerSize / 3) * 0.5}
            />
            <rect
              className="decor-pic__rect"
              x={w - (cornerSize / 3) * 0.5}
              y={h - cornerSize + (cornerSize / 3) * 0.5}
              width={(cornerSize / 3) * 0.5}
              height={cornerSize - (cornerSize / 3) * 0.5}
            />
          </>
        );
      case 4:
        return (
          <>
            <clipPath id={maskID}>
              <polygon
                points={`0,0 ${w},0 ${w},${h} ${cornerSize},${h} ${cornerSize},${
                  h - cornerSize / 3
                } ${cornerSize / 3},${h - cornerSize / 3} ${
                  cornerSize / 3
                },${h - cornerSize} 0,${h - cornerSize}`}
              />
            </clipPath>
            <rect
              className="decor-pic__rect"
              x="0"
              y={h - (cornerSize / 3) * 0.5}
              width={cornerSize - (cornerSize / 3) * 0.5}
              height={(cornerSize / 3) * 0.5}
            />
            <rect
              className="decor-pic__rect"
              x="0"
              y={h - cornerSize + (cornerSize / 3) * 0.5}
              width={(cornerSize / 3) * 0.5}
              height={cornerSize - (cornerSize / 3) * 0.5}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <picture className={`decor-pic ${className}`}>
      <svg
        className={`decor-pic__svg decor-pic__svg--${variant}`}
        viewBox={`0,0 ${w},${h}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderDecorations()}
        {!isLoaded && (
          <rect
            width={w}
            height={h}
            clipPath={`url(#${maskID})`}
            className="decor-pic__img-placeholder"
          />
        )}
        <image
          width={cover ? "100%" : w}
          height={cover ? "100%" : h}
          clipPath={`url(#${maskID})`}
          className={`decor-pic__img decor-pic__img--${isLoaded ? 'visible' : 'hidden'}`}
          href={imgurl}
          {...(cover ? { preserveAspectRatio: "xMidYMid slice" } : {})}
        />
      </svg>
    </picture>
  );
};

export default DecoratedPicture;