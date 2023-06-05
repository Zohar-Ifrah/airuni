import { UserMsg } from './user-msg.jsx'

export function AppFooter() {

    // const count = useSelector(storeState => storeState.userModule.count)




    return (
        <footer className="app-footer full">
            <p>
                CoffeeRights 2023 | By Zohar Ifrah, Gil Shaashua and Yuval Turjeman
            </p>
            <UserMsg />
        </footer>
    )
}