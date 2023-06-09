import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"

export function Wishlist() {
    const navigate = useNavigate()
    const isUserLogged = true // TO EDIT
    const user = userService.getLoggedinUser()

    return (
        <>
            {isUserLogged ?
                <div>

                    {console.log(user)}
                    <h1>Wishlist</h1>
                    {true &&
                        <div>
                            <h3>Create your first wishlist</h3>
                            <p>As you search, click the heart icon to save your favorite places and Experiences to a wishlist.</p>
                        </div>
                    }
                </div>
                : navigate('/')
            }
        </>
    )
}