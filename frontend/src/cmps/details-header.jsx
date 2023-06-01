
export function DetailsHeader({ stay }) {


    return (
        <div className="details-header">
            <h2> {stay.name}</h2>
            <p> 
                <span> ⭐ reviews </span>
                <span> {stay.loc.country}, {stay.loc.city}</span>
            </p>

        </div>


    )
}