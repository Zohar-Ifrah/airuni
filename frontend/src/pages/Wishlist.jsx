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
        if (stays.length) return
        loadStays()
    }, [])

    useEffect(() => {
        if (!stays.length) return
        const wishlist = stays.filter((stay) =>
            stay.likedByUsers.find(
                (likedByUser) => likedByUser === isUserLogged._id
            )
        )
        setIsWishlist((prevIsWishlist) => wishlist)
    }, [stays])

    return (
        <section className="wishlist-container">
            {isUserLogged ? (
                wishlist.length ? (
                    <ul className="wishlist card-grid">
                        {wishlist.map((currWishlist) => (
                            <StayPreview
                                stay={currWishlist}
                                key={currWishlist._id}
                            />
                        ))}
                    </ul>
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
