export function SkeletonPreview() {
    return (
        <li className="stay-preview skeleton-preview">
            <div className="carousel-wrapper">
                <div className="img-preview skeleton"></div>
            </div>
            <div className="location-rating-container flex space-between">
                <h4 className="skeleton">some city some country </h4>

                <div className="rating-container flex align-center">
                    <span className="skeleton">4.34 (14)</span>
                </div>
            </div>
            <p className="skeleton">some distance away</p>
            <p className="skeleton">some date</p>
            <p className="skeleton">price night</p>
        </li>
    )
}