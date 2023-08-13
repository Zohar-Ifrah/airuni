export function DetailsGalleryMobile({ stay }) {
    return (
        <section className="details-gallery-mobile full">
            <article className="details-gallery-mobile-inner-container">
                <img src={stay.imgUrls[0]} alt="stay-img" />
                <span>{`1/${stay.imgUrls.length}`}</span>
            </article>
        </section>
    )
}
