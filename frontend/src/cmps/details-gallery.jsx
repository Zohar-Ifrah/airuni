import { useState } from 'react'
import { DetailsFullGallery } from './details-full-gallery';

export function DetailsGallery({ stay }) {
    const [showMore, setShowMore ] = useState(false)

    function onOpenImgsModal(){
        setShowMore(true)
    }

    function onCloseImgsModal() {
        setShowMore(false)
    }

    return (

        <div >
            {stay && (
            <div className="details-gallery">

                <img src={stay.imgUrls[0].url} alt="" />
                <img src={stay.imgUrls[0].url} alt="" />
                <img src={stay.imgUrls[0].url} alt="" />
                <img src={stay.imgUrls[0].url} alt="" />
                <img src={stay.imgUrls[0].url} alt="" />
                {showMore && (
                  <DetailsFullGallery stay={stay} onClose={onCloseImgsModal} />
                )}
                  </div>
      )}
      {/* {!showMore && (
        <button onClick={onOpenImgsModal}>Show more photos</button>
      )} */}
    </div>
  );
}