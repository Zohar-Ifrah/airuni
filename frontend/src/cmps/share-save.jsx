import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShareModal } from './share-modal'


export function ShareSave({stay}) {

    const [isShareModalOpen, setIsShareModalOpen] = useState(false)

    function displayShareModal(isDisplay) {
        console.log(isDisplay)
        setIsShareModalOpen(isDisplay)
    }

    function onOpenModalShowMore(isOpen = true) {
        setIsShareModalOpen(isOpen)
    }

    return (
        <div className="share-save-container flex align-center">
            {/* on share btn click */}
            {isShareModalOpen &&
                <div>
                    <div onClick={() => onOpenModalShowMore(false)} className="blur all"></div>
                    <ShareModal 
                    stay ={stay}
                    setIsShareModalOpen={setIsShareModalOpen} />
                </div>
            }
            <Link to="#">
                <div onClick={() => displayShareModal(true)} className="share-container flex align-center">
                    <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685700527/share_g6x8aa.svg" alt="Share" />
                    <span> Share </span>
                </div>
            </Link>
            <Link to="#">
                <div className="like-container flex align-center">
                    <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685700527/like_cwq9fw.svg" alt="Like" />
                    <span> Save </span>
                </div>
            </Link>
        </div>
    )
}