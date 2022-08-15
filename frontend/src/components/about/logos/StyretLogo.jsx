import './StyretLogo.css';

const StyretLogo = () => {
    return (
      <svg className="StyretLogo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">            
        <path d="M7 75 H0 V100 H7 V75 Z" className="LogoCorner"/>
        <path d="M100 75 H93 V100 H100 V75 Z" className="LogoCorner"/>
        <path d="M100 0 H93 V25 H100 V0 Z" className="LogoCorner"/>
        <path d="M100 0 H75 V7 H100 V0 Z" className="LogoCorner"/>
        <path d="M25 93 H0 V100 H25 V93 Z" className="LogoCorner"/>
        <path d="M100 93H 75V 100H 100 V93 Z" className="LogoCorner"/>
        <path d="M25 0 H0 V7 H25 V0 Z" className="LogoCorner"/>
        <path d="M7 0 H0 V25 H7 V0 Z" className="LogoCorner"/>
        <g className="Handlebars">
          <path d="M50 79V69" className="StrokeWhite" strokeWidth="4"/>
          <rect className="FillWhite" x="43" y="61" width="14" height="8" />
          <path d="M43 65 H42 C40 65 38 63.7 37.3 61.7 L30.4 43.3 C30 41.3 28 40 25.8 40 H23" className="StrokeWhite" strokeWidth="4"/>
          <path d="M57 65 H58 C60 65 62 63.7 62.7 61.7 L69.6 43.3 C70 41.3 72 40 74.2 40 H77" className="StrokeWhite" strokeWidth="4"/>
          <line x1="32" y1="46.5" x2="68" y2="46.5" className="StrokeWhite" strokeWidth="3"/>
          <line x1="78.5" y1="47.5" x2="78.5" y2="32.5" className="StrokeWhite" strokeWidth="3"/>
          <line x1="21.5" y1="47" x2="21.5" y2="32" className="StrokeWhite" strokeWidth="3"/>
          <rect x="9.5" y="36.5" width="12" height="6" className="StrokeWhite" strokeWidth="3"/>
          <rect x="78.5" y="37" width="12" height="6" className="StrokeWhite" strokeWidth="3"/>
        </g>
      </svg>
    )
  }

export default StyretLogo