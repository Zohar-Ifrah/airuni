import { useState } from "react"
import { SearchMenu } from "./search-menu"

export function HeaderFilterMobile({
    onSetFilter,
    isDetailsShown,
    isHeaderClicked,
}) {

    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
    const [focusBtn, setFocusBtn] = useState(null)
    const [barFocused, setBarFocused] = useState(null)

    function onChangeBarDisplay(focusBtn, isOpen) {
        console.log(focusBtn)
        // setFocusBtn(focusBtn)
        setIsSearchBarOpen(isOpen)
    }

    function isBarFocused(isFocus) {
        // console.log('isFocus: ', isFocus)
        setBarFocused(isFocus)
      }

    return (
        <div className="header-filter-mobile-container flex align-center"
            onClick={() => { onChangeBarDisplay('Search', true) }}>
            <div className="icon-search">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                        display: 'block',
                        height: '16px',
                        width: '16px',
                        fill: 'currentcolor',
                    }}
                >
                    <path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path>
                </svg>
            </div>
            <div className="search-container flex column ">
                <span>Anywhere</span>
                <span>Any week • Add guests</span>
            </div>
            {isSearchBarOpen &&
                <div className={`search-bar-mobile main-layout ${isSearchBarOpen ? 'search-bar-open' : ''}`}>
                    <div className={`search-form-menu-container-moblie`}>
                        <div>X</div>
                        <SearchMenu onChangeBarDisplay={onChangeBarDisplay}
                            focusBtn={focusBtn}
                            isBarFocused={isBarFocused}
                            isHeaderClicked={isHeaderClicked}
                        />
                    </div>
                </div>
            }
        </div>
    )
}
