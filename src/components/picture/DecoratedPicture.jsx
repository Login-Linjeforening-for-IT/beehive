import './DecoratedPicture.css';


const DecoratedPicture = ({imgurl, decorationNr, w, h, cornerSize}) => {
    
    const maskID = 'mask-' + decorationNr + '-' + w + '-' + h
    
    const Corner = () => {
        switch(decorationNr) {
            case 0 : 
            return(
                <>
                
                <image width={w} height={h} clipPath={'url(#' + maskID + ')'} className='decor-pic__img'  href={imgurl} />
                
                </>
            ) 
            case 1 : 
            return(
                <>
                <clipPath id={maskID}>
                    <polygon points={`0,${cornerSize} ${cornerSize / 3},${cornerSize} ${cornerSize / 3},${cornerSize / 3} ${cornerSize},${cornerSize / 3} ${cornerSize},0 ${w},0 ${w},${h} 0,${h} `} />
                </clipPath>
                <image width={w} height={h} clipPath={'url(#' + maskID + ')'} className='decor-pic__img'  href={imgurl} />
                <rect className='decor-pic__rect--orange' x='0' y='0' width={cornerSize - (cornerSize / 3 * .5)} height={cornerSize / 3 * .5} />
                <rect className='decor-pic__rect--orange' x='0' y='0' width={cornerSize / 3 * .5} height={cornerSize - (cornerSize / 3 * .5)} />
                </>
            ) 
            
            case 2 : 
            return(
                <>
                <clipPath id={maskID}>
                    <polygon points={`0,0 ${w - cornerSize},0 ${w - cornerSize},${cornerSize / 3} ${w - (cornerSize / 3)},${cornerSize / 3} ${w - (cornerSize / 3)},${cornerSize} ${w},${cornerSize} ${w},${h} 0,${h}`} />
                </clipPath>
                <image width={w} height={h} clipPath={'url(#' + maskID + ')'} className='decor-pic__img'  href={imgurl} />
                <rect className='decor-pic__rect--orange' x={w - cornerSize + (cornerSize / 3 * .5)} y='0' width={cornerSize - (cornerSize / 3 * .5)} height={cornerSize / 3 * .5} />
                <rect className='decor-pic__rect--orange' x={w - (cornerSize / 3 * .5)} y='0' width={cornerSize / 3 * .5} height={cornerSize - (cornerSize / 3 * .5)} />
                </>
            ) 
            
            case 3 : 
            return(
                <>
                <clipPath id={maskID}>
                    <polygon points={`0,0 ${w},0 ${w},${h - cornerSize} ${w - (cornerSize / 3)},${h - cornerSize} ${w - (cornerSize / 3)},${h - (cornerSize / 3)} ${w - cornerSize},${h - (cornerSize / 3)} ${w - cornerSize},${h} 0,${h}`} />
                </clipPath>
                <image width={w} height={h} clipPath={'url(#' + maskID + ')'}className='decor-pic__img'  href={imgurl} />
                <rect className='decor-pic__rect--orange' x={w - cornerSize + (cornerSize / 3 * .5)} y={h - (cornerSize / 3 * .5)} width={cornerSize - (cornerSize / 3 * .5)} height={cornerSize / 3 * .5} />
                <rect className='decor-pic__rect--orange' x={w - (cornerSize / 3 * .5)} y={h - cornerSize + (cornerSize / 3 * .5)} width={cornerSize / 3 * .5} height={cornerSize - (cornerSize / 3 * .5)} />
                </>
            )
            
            case 4 : 
            return(
                <>
                <clipPath id={maskID}>
                    <polygon points={`0,0 ${w},0 ${w},${h} ${cornerSize},${h} ${cornerSize},${h - (cornerSize / 3)} ${cornerSize / 3},${h - (cornerSize / 3)} ${cornerSize / 3},${h - (cornerSize)} 0,${h - (cornerSize)}`} />
                </clipPath>
                <image loading='lazy' width={w} height={h} clipPath={'url(#' + maskID + ')'} className='decor-pic__img'  href={imgurl} />
                <rect className='decor-pic__rect--orange' x='0' y={h - (cornerSize / 3 * .5)} width={cornerSize - (cornerSize / 3 * .5)} height={cornerSize / 3 * .5} />
                <rect className='decor-pic__rect--orange' x='0' y={h - cornerSize + (cornerSize / 3 * .5)} width={cornerSize / 3 * .5} height={cornerSize - (cornerSize / 3 * .5)} />
                </>
            ) 
            
            default : return(<></>)
        }
    }


    return (
        <picture className='decor-pic'>
            <svg className={'decor-pic__svg decor-pic__svg--' + decorationNr} viewBox={`0,0 ${w},${h}`} xmlns='http://www.w3.org/2000/svg'>
                <Corner />
            </svg>
        </picture>
    )
  }

  export default DecoratedPicture