

export function DetailsGallery({ stay }) {

    // function onOpenImgsModal(){
    //     console.log('To Edit Func')
    // }

    return (

        <div >
            {stay &&
            <div className="details-gallery">
                <img src={stay.imgUrls[0].url} alt="" />
                <img src={stay.imgUrls[0].url} alt="" />
                <img src={stay.imgUrls[0].url} alt="" />
                <img src={stay.imgUrls[0].url} alt="" />
                <img src={stay.imgUrls[0].url} alt="" />
             
                </div>
            }
            {/* <button onClick={() => { onOpenImgsModal('something') }}>show all imgs</button> */}
         </div>

    )
}