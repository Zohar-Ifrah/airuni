import { useEffect, useRef, useState } from 'react'
import { DetailsFullGallery } from './details-full-gallery';
import { eventBus } from '../services/event-bus.service';

export function DetailsGallery({ stay }) {
  const [showMore, setShowMore] = useState(false)
  const galleryRef = useRef()
  // function onOpenImgsModal(){
  //     setShowMore(true)
  // }
  // function onOpenImgsModal() {
  //   setShowMore(true)
  // }

  useEffect(() => {
    eventBus.emit('details-load', galleryRef)
    return
  }, [])

  function onCloseImgsModal() {
    setShowMore(false)
  }

  return (

    <div ref={galleryRef} className="details-gallery">

      {stay.imgUrls.map(imgUrl => {
        return <img key={imgUrl} src={imgUrl} alt="" />
      })}

      {showMore && (
        <DetailsFullGallery stay={stay} onClose={onCloseImgsModal} />
      )}
    </div>

  )
}
