import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay, onUpdateStay }) {
    if (!stays) return <h1>no stays available</h1>

    return (
        <ul className="stay-list">
            {stays.map((stay) => (
                <StayPreview
                    key={stay._id}
                    stay={stay}
                    onRemoveStay={onRemoveStay}
                    onUpdateStay={onUpdateStay}
                />
            ))}
        </ul>
    )
}
