import './BedkomLogoAnimation.css';

export default function bedkomLogo() {
    return (
        <svg className='bedkom-logo committee-logo' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
            <path d='M7 75 H0 V100 H7 V75 Z' className='committee-logo--corner'/>
            <path d='M100 75 H93 V100 H100 V75 Z' className='committee-logo--corner'/>
            <path d='M100 0 H93 V25 H100 V0 Z' className='committee-logo--corner'/>
            <path d='M100 0 H75 V7 H100 V0 Z' className='committee-logo--corner'/>
            <path d='M25 93 H0 V100 H25 V93 Z' className='committee-logo--corner'/>
            <path d='M100 93H 75V 100H 100 V93 Z' className='committee-logo--corner'/>
            <path d='M25 0 H0 V7 H25 V0 Z' className='committee-logo--corner'/>
            <path d='M7 0 H0 V25 H7 V0 Z' className='committee-logo--corner'/>
            <path className='bedkom-logo__l1 committee-logo--stroke-color' d='m 41 68 l -10 6' strokeWidth='3' />
            <circle className='bedkom-logo__c1 committee-logo--stroke-color committee-logo--fill-bg-color' cx='25' cy='78' r='6' strokeWidth='3'/>
            <path className='bedkom-logo__l2 committee-logo--stroke-color' d='m 41 52 l -18 -11' strokeWidth='3' />
            <circle className='bedkom-logo__c2 committee-logo--stroke-color committee-logo--fill-bg-color' cx='19' cy='38' r='6' strokeWidth='3' />
            <path className='bedkom-logo__l3 committee-logo--stroke-color' d='m 49 45 l -7 -21' x1='49' y1='45' x2='42' y2='24' strokeWidth='3' />
            <circle className='bedkom-logo__c3 committee-logo--stroke-color committee-logo--fill-bg-color' cx='40' cy='18' r='6' strokeWidth='3' />
            <path className='bedkom-logo__l4 committee-logo--stroke-color' d='m 64 47 l 11 -17' strokeWidth='3' />
            <circle className='bedkom-logo__c4 committee-logo--stroke-color committee-logo--fill-bg-color' cx='78' cy='25' r='6' strokeWidth='3' />
            <path className='bedkom-logo__l5 committee-logo--stroke-color' d='m 67 69 l 7 6' strokeWidth='3' />
            <circle className='bedkom-logo__c5 committee-logo--stroke-color committee-logo--fill-bg-color' cx='78' cy='78' r='6' strokeWidth='3' />
            <circle className='bedkom-logo__c6 committee-logo--stroke-color committee-logo--fill-bg-color' cx='55' cy='60' r='15' strokeWidth='3' />

            <path className='committee-logo--stroke-color committee-logo--fill-color' d='M55 62C57.7614 62 60 59.7614 60 57C60 54.2386 57.7614 52 55 52C52.2386 52 50 54.2386 50 57C50 59.7614 52.2386 62 55 62Z' />
            <path className='committee-logo--stroke-color committee-logo--fill-color' d='M46.069 70.5C47.4792 64.5 62.5207 64.5 63.931 70.5C65.3412 76.5 44.6588 76.5 46.069 70.5Z' />
        </svg>
    )
}