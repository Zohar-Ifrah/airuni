import { useState } from 'react'
import { DetailsFullGallery } from './details-full-gallery';

export function DetailsGallery({ stay }) {
  const [showMore, setShowMore] = useState(false)

    // function onOpenImgsModal(){
    //     setShowMore(true)
    // }
  function onOpenImgsModal() {
    setShowMore(true)
  }

  function onCloseImgsModal() {
    setShowMore(false)
  }

  return (

    <div className="details-gallery">

      {stay.imgUrls.map(imgUrl => {
        return <img key={imgUrl.id} src={imgUrl.url} alt="" />
      })}

      {showMore && (
        <DetailsFullGallery stay={stay} onClose={onCloseImgsModal} />
      )}
    </div>

  )
}

{/* {!showMore && (
        <button onClick={onOpenImgsModal}>Show more photos</button>
      )} */}