import { StayPreview } from "./stay-preview"

export function StayList({ stays, onRemoveStay, onUpdateStay }) {

    if (!stays) return <h1>no stays available</h1>
    return <ul className="stay-list">
        {stays.map(stay =>
            <li className="stay-preview" key={stay._id}>
                <StayPreview
                    stay={stay}
                    onRemoveStay={onRemoveStay}
                    onUpdateStay={onUpdateStay} />
            </li>)}
    </ul>
}


