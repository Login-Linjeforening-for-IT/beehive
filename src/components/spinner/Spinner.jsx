import { useEffect, useState } from 'react';
import './Spinner.css';

export default function Spinner({w, h}) {
	const [displaySpinner, setDisplaySpinner] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            setDisplaySpinner(true);
        }, 200);
    
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="spinner">
            { displaySpinner && 
                <>
                    <svg className='spinner__svg' width={w} height={h} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <path className="spinner__corners" d="m 0 12.5 l 0 -12.5 l 50 0 l 0 50 l -50 0 l 0 -37.5" />
                        <path className="spinner__l" d="m 18 9 l 0 30 l 16 0" />
                    </svg>
                </>
            }
        </div>
    )
}
