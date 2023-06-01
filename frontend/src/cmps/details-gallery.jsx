

export function DetailsGallery({ stay }) {

    // function onOpenImgsModal(){
    //     console.log('To Edit Func')
    // }

    return (

        <div className="details-gallery">
            {stay &&
                <img src={stay.imgUrls[0].url} alt="" />
            }
            {/* <button onClick={() => { onOpenImgsModal('something') }}>show all imgs</button> */}
        </div>

    )
}