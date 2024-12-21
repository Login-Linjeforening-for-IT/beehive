import "./EventCardSkeleton.css"

export default function EventCardSkeleton() {
    return (
        <div className="event-card-skeleton">
            <div className="event-card-skeleton__image skeleton"></div>
            <div className="event-card-skeleton__name skeleton"></div>
            <div className="event-card-skeleton__details skeleton"></div>
        </div>
    )
};
