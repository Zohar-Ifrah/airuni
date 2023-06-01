import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';


export function DetailsHeader({ stay }) {


    return (
        <div className="details-header">
            <h2> {stay.name}</h2>
            <h5> <span> ⭐ reviews </span> <span> {stay.loc.country}, {stay.loc.city}</span></h5>
            <div>
                <FontAwesomeIcon icon={faShareAlt} />
            </div>
        </div>


    )
}