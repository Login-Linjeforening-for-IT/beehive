import "./EventCardSkeleton.css";

const EventCardSkeleton = () => {
    return (
        <div className="event-card-skeleton">
            <div className="event-card-skeleton__image skeleton"></div>
            <div className="event-card-skeleton__name skeleton"></div>
            <div className="event-card-skeleton__details skeleton"></div>
        </div>
    );
};

export default EventCardSkeleton;
