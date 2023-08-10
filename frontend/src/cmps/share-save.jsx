import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShareModal } from './share-modal'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { UPDATE_STAY } from '../store/stay.reducer'
import { showErrorMsg } from '../services/event-bus.service'

export function ShareSave({ stay, loadStay }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const isProccesingRef = useRef(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLiked((prevIsLiked) =>
            stay.likedByUsers.find((likedByUser) => likedByUser === user?._id)
        )
    }, [user])

    function displayShareModal(isDisplay) {
        setIsShareModalOpen(isDisplay)
    }

    function onOpenModalShowMore(isOpen = true) {
        setIsShareModalOpen(isOpen)
    }

    async function onSelectLike() {
        if (isProccesingRef.current) return

        if (!user) {
            return showErrorMsg('Please login first!')
        }

        if (isLiked) {
            isProccesingRef.current = true
            const userLikedIdx = stay.likedByUsers.findIndex(
                (likedByUser) => likedByUser === user._id
            )
            stay.likedByUsers.splice(userLikedIdx, 1)
            const hostId = stay.host._id
            delete stay.host
            stay.host = hostId
            stay.reviews = stay.reviews.map((review) => review._id)

            const savedStay = await stayService.save(stay)
            dispatch({
                type: UPDATE_STAY,
                stay: savedStay,
            })
        } else {
            isProccesingRef.current = true
            stay.likedByUsers.push(user._id)
            const hostId = stay.host._id
            delete stay.host
            stay.host = hostId
            stay.reviews = stay.reviews.map((review) => review._id)

            const savedStay = await stayService.save(stay)
            dispatch({
                type: UPDATE_STAY,
                stay: savedStay,
            })
        }
        await loadStay()
        isProccesingRef.current = false
        setIsLiked((prevIsLiked) => !prevIsLiked)
    }

    return (
        <div className="share-save-container flex align-center">
            {/* on share btn click */}
            {isShareModalOpen && (
                <div>
                    <div
                        onClick={() => onOpenModalShowMore(false)}
                        className="blur all"
                    ></div>
                    <ShareModal
                        stay={stay}
                        setIsShareModalOpen={setIsShareModalOpen}
                    />
                </div>
            )}
            <Link to="#">
                <div
                    onClick={() => displayShareModal(true)}
                    className="share-container flex align-center"
                >
                    <img
                        src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685700527/share_g6x8aa.svg"
                        alt="Share"
                    />
                    <span> Share </span>
                </div>
            </Link>
            <Link to="#">
                <div
                    className="like-container flex align-center"
                    onClick={onSelectLike}
                >
                    {isLiked ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'red',
                                height: '16px',
                                width: '16px',
                                stroke: 'currentcolor',
                                strokeWidth: 2,
                                overflow: 'visible',
                            }}
                        >
                            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'none',
                                height: '16px',
                                width: '16px',
                                stroke: 'currentcolor',
                                strokeWidth: 2,
                                overflow: 'visible',
                            }}
                        >
                            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
                        </svg>
                    )}
                    <span>
                        {isLiked
                            ? isProccesingRef.current
                                ? 'Unsaving...'
                                : 'Saved'
                            : isProccesingRef.current
                            ? 'Saving...'
                            : 'Save'}
                    </span>
                </div>
            </Link>
        </div>
    )
}
