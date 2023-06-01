


export function DetailsHeader({ stay }) {


    return (
        <div className="details-header">
            <h4> {stay.name}</h4>
            <h5> <span> ⭐ reviews </span> <span> {stay.loc.country}, {stay.loc.city}</span></h5>
        </div>
    )
}