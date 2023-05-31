import { StayPreview } from "./stay-preview"

export function StayList({ stays, onRemoveStay}) {

    if (!stays) return <h1>no stays available</h1>
    return <ul className="stay-list main-layout">
        {stays.map(stay =>
            <li className="stay-preview" key={stay._id}>
                <StayPreview stay={stay} onRemoveStay={onRemoveStay} />
            </li>)}
    </ul>
}


