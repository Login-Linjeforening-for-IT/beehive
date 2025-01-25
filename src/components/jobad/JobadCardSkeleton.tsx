import './JobadCardSkeleton.css'

export default function JobadCardSkeleton() {
    return (
        <div className='jobad-card-skeleton'>
            <div className='jobad-card-skeleton_image skeleton' />
            <div className='jobad-card-skeleton_name skeleton' />
            <div className='jobad-card-skeleton_details skeleton' />
        </div>
    )
}
