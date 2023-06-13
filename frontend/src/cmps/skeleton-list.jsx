import { SkeletonPreview } from './skeleton-preview'

export function SkeletonList() {
    return (
        <ul className="stay-list">
            {Array.from({ length: 24 }).map((_, idx) => (
                <SkeletonPreview key={idx} />
            ))}
        </ul>
    )
}