import { Link } from 'react-router-dom'


export function ShareSave() {


    return (
        <div className="share-save-container flex align-center">
            <Link to="#">
                <div className="share-container flex align-center">
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