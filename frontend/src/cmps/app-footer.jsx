import { useSelector } from "react-redux"

export function AppFooter() {

    const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)




    return (
        <footer className={`app-footer full ${isDetailsShown ? 'details-main-layout' : 'main-layout'}`}>
            <div className="footer-inner-container">
                <p> CoffeeRights 2023 | By Zohar Ifrah and Gil Shaashua </p>
            </div>
        </footer>
    )
}