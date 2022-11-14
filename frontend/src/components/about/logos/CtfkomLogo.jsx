import './CtfkomLogo.css';

const CtfkomLogo = () => {
    return (
      <svg className="CtfkomLogo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 75 H0 V100 H7 V75 Z" className="LogoCorner"/>
        <path d="M100 75 H93 V100 H100 V75 Z" className="LogoCorner"/>
        <path d="M100 0 H93 V25 H100 V0 Z" className="LogoCorner"/>
        <path d="M100 0 H75 V7 H100 V0 Z" className="LogoCorner"/>
        <path d="M25 93 H0 V100 H25 V93 Z" className="LogoCorner"/>
        <path d="M100 93H 75V 100H 100 V93 Z" className="LogoCorner"/>
        <path d="M25 0 H0 V7 H25 V0 Z" className="LogoCorner"/>
        <path d="M7 0 H0 V25 H7 V0 Z" className="LogoCorner"/>
        <path className="flagpiece3 StrokeWhite FillbgColor" d="m45 32.5 l25 0 l5 25 l-25 0 z" strokeWidth="3" />
        <path className="flagpiece2 StrokeWhite FillbgColor" d="m25 27.5 l25 0 l5 25 l-25 0 z" strokeWidth="3" />                    
        <path className="flagpiece1 StrokeWhite FillbgColor" d="m25 25 l0 0 l5 25 l0 0 z" strokeWidth="3" />
        <polygon points="24,23 26,23 37,83 35,83 24,23" className="StrokeWhite" strokeWidth="3" />
        <circle className="FillWhite StrokeWhite" cx="24.5" cy="20" r="3" strokeWidth="3" />
      </svg>
    )
  }

  export default CtfkomLogo