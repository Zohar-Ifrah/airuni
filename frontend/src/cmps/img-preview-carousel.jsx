import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useState } from "react"

export function CarouselComponent({ images }) {

    const [activeIndex, setActiveIndex] = useState(0)

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

    return (
        <div className="carousel-wrapper">
            <Carousel showThumbs={false} selectedItem={activeIndex} renderArrowPrev={renderCustomPrevArrow}
                renderArrowNext={renderCustomNextArrow}>
                {images.map(image => {
                    return <img src={image.url} className="img-preview" alt="" key={image.id} />
                })}
            </Carousel>
            <button className="btn-carousel-left" onClick={handlePrevClick}>{'<'}</button>
            <button className="btn-carousel-right" onClick={handleNextClick}>{'>'}</button>
        </div>
    )
}