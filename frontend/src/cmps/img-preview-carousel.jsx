import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function CarouselComponent({ images }) {

    return (
        <div className="carousel-wrapper">
            <Carousel showThumbs={false}>
                {images.map(image => {
                    return <img src={image.url} className="img-preview" alt="" key={image.id} />
                })}
            </Carousel>
        </div>
    );
}