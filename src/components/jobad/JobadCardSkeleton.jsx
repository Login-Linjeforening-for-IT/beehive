import "./JobadCardSkeleton.css";

const JobadCardSkeleton = () => {
    return (
        <div className='jobad-card-skeleton'>
            <div className='jobad-card-skeleton__image skeleton'></div>
            <div className='jobad-card-skeleton__name skeleton'></div>
            <div className='jobad-card-skeleton__details skeleton'></div>
        </div>
    );
};

export default JobadCardSkeleton;
