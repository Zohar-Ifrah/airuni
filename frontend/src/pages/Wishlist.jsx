import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadStays } from '../store/stay.actions'
import { StayPreview } from '../cmps/stay-preview'

export function Wishlist() {
    const navigate = useNavigate()
    const isUserLogged = useSelector((storeState) => storeState.userModule.user)
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const [wishlist, setIsWishlist] = useState([])

    useEffect(() => {
        if (!isUserLogged) return
        loadStays()
    }, [])

    useEffect(() => {
        if (!stays.length) return
        if (!isUserLogged) return
        const wishlist = stays.filter((stay) =>
            stay.likedByUsers.find(
                (likedByUser) => likedByUser === isUserLogged._id
            )
        )
        setIsWishlist(wishlist)
    }, [stays])

    if (!stays.length || !stays)
        return (
            <div className="loader flex align-center justify-center">
                <img
                    src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1686751739/home-marker_ovo9yb.svg"
                    alt="loader"
                />
            </div>
        )

    return (
        <section className="wishlist-container">
            {isUserLogged ? (
                wishlist.length ? (
                    <>
                        <h2>Wishlists</h2>
                        <ul className="wishlist card-grid">
                            {wishlist.map((currWishlist) => (
                                <StayPreview
                                    stay={currWishlist}
                                    key={currWishlist._id}
                                />
                            ))}
                        </ul>
                    </>
                ) : (
                    <div>
                        <h1>Wishlist</h1>
                        {true && (
                            <div>
                                <h3>Create your first wishlist</h3>
                                <p>
                                    As you search, click the heart icon to save
                                    your favorite places and Experiences to a
                                    wishlist.
                                </p>
                            </div>
                        )}
                    </div>
                )
            ) : (
                navigate('/')
            )}
        </section>
    )
}
