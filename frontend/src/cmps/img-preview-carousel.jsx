import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { UPDATE_STAY } from '../store/stay.reducer'
import { loadStays } from '../store/stay.actions'
import { showErrorMsg } from '../services/event-bus.service'

export function CarouselComponent({ images, stay }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const [isLiked, setIsLiked] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLiked((prevIsLiked) =>
            stay.likedByUsers.find(
                (likedByUser) => likedByUser === loggedInUser?._id
            )
        )
    }, [loggedInUser])

    const handlePrevClick = (event) => {
        event.stopPropagation()
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const handleNextClick = (event) => {
        event.stopPropagation()
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }

    const renderCustomPrevArrow = (onClickHandler, hasPrev) => {
        return
    }

    const renderCustomNextArrow = (onClickHandler, hasNext) => {
        return
    }

    async function onSelectLike(ev) {
        ev.stopPropagation()
        if (!loggedInUser) {
            return showErrorMsg('Login first please!')
        }

        if (isLiked) {
            const likeIdx = stay.likedByUsers.findIndex(
                (likedByUser) => likedByUser === loggedInUser._id
            )
            stay.likedByUsers.splice(loggedInUser._id)
            const savedStay = await stayService.save(stay)
            dispatch({
                type: UPDATE_STAY,
                stay: savedStay,
            })
            setIsLiked((prevIsLiked) => false)
        } else {
            stay.likedByUsers.push(loggedInUser._id)
            const savedStay = await stayService.save(stay)
            dispatch({
                type: UPDATE_STAY,
                stay: savedStay,
            })
            setIsLiked((prevIsLiked) => true)
        }
    }

    return (
        <div className="carousel-wrapper">
            <Carousel
                showThumbs={false}
                selectedItem={activeIndex}
                renderArrowPrev={renderCustomPrevArrow}
                renderArrowNext={renderCustomNextArrow}
            >
                {images.map((image) => {
                    return (
                        <img
                            src={image}
                            className="img-preview"
                            alt={image}
                            key={image}
                        />
                    )
                })}
            </Carousel>
            <button className="btn-carousel-left" onClick={handlePrevClick}>
                <img
                    src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-left_gokdbn.svg"
                    alt="left-arrow"
                />
            </button>
            <button className="btn-carousel-right" onClick={handleNextClick}>
                <img
                    src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-right_ysb8ow.svg"
                    alt="right-arrow"
                />
            </button>
            {isLiked && (
                <img
                    className="like"
                    src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685998127/like_ussnvd.svg"
                    alt="like"
                    onClick={onSelectLike}
                />
            )}
            {!isLiked && (
                <img
                    className="dislike"
                    src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685998127/dislike_ax5raz.svg"
                    alt="dislike"
                    onClick={onSelectLike}
                />
            )}
        </div>
    )
}
