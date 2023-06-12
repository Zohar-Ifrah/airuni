import { AllReviews } from "./all-reviews";
import { StatisticsReviews } from "./statistics-reviews";
import exit from "../assets/img/exit.svg"
export function ShowAllReviews({ stay, onOpenModalShowMore }) {

    return (
        <div className="show-all-reviews">
            <img onClick={() => onOpenModalShowMore(false)} src={exit} alt="exit" />
            {/* <StatisticsReviews stay={stay} /> */}
            <AllReviews stay={stay} />
        </div>
    )
}