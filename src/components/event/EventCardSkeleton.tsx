import './EventCardSkeleton.css'

export default function EventCardSkeleton() {
    return (
        <div className="event-card-skeleton">
            <div className="event-card-skeleton_image skeleton"></div>
            <div className="event-card-skeleton_name skeleton"></div>
            <div className="event-card-skeleton_details skeleton"></div>
        </div>
    )
}
