import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useState } from "react"

export function CarouselComponent({ images }) {

    const [activeIndex, setActiveIndex] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    const handlePrevClick = (event) => {
        event.stopPropagation()
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }

    const handleNextClick = (event) => {
        event.stopPropagation()
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }

    const renderCustomPrevArrow = (onClickHandler, hasPrev) => {
        return
    }

    const renderCustomNextArrow = (onClickHandler, hasNext) => {
        return
    }

    function onSelectLike(ev) {
        ev.stopPropagation()
        setIsLiked(prevIsLiked => !prevIsLiked)
    }

    return (
        <div className="carousel-wrapper">
            <Carousel showThumbs={false} selectedItem={activeIndex} renderArrowPrev={renderCustomPrevArrow}
                renderArrowNext={renderCustomNextArrow}>
                {images.map(image => {
                    return <img src={image.url} className="img-preview" alt={image.id} key={image.id} />
                })}
            </Carousel>
            <button className="btn-carousel-left" onClick={handlePrevClick}>
                <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-left_gokdbn.svg" alt="left-arrow" />
            </button>
            <button className="btn-carousel-right" onClick={handleNextClick}>
                <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685990897/arrow-right_ysb8ow.svg" alt="right-arrow" />
            </button>
            {isLiked && <img className="like" src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685998127/like_ussnvd.svg" alt="like" onClick={onSelectLike} />}
            {!isLiked && <img className="dislike" src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1685998127/dislike_ax5raz.svg" alt="dislike" onClick={onSelectLike} />}
        </div>
    )
}