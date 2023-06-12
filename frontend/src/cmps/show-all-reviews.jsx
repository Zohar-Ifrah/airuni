import { AllReviews } from "./all-reviews"


export function ShowAllReviews({ stay, onOpenModalShowMore }) {

    return (
        <div className="show-all-reviews">
            {/* <StatisticsReviews stay={stay} /> */}
            <AllReviews stay={stay} onOpenModalShowMore={onOpenModalShowMore} />
        </div>
    )
}