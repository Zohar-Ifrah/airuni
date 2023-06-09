import { useEffect, useState } from "react"
import { SearchMenu } from "./search-menu"
import search from '../assets/img/search.svg'
import { useSelector } from "react-redux"

export function HeaderFilter({ onSetFilter }) {

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
  const [focusBtn, setFocusBtn] = useState(null)
  const [barFocused, setBarFocused] = useState(null)
  const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)


  useEffect(() => {

  }, [barFocused])

  function isBarFocused(isFocus) {
    // console.log('isFocus: ', isFocus)
    setBarFocused(isFocus)
  }

  function onSearchClick(ev) {
    ev.stopPropagation()
    console.log('clicked')
    onChangeBarDisplay('Search', true)
  }

  function onChangeBarDisplay(focusBtn, isOpen) {
    // console.log('HEADER focusBtn: ', focusBtn)
    setFocusBtn(focusBtn)
    setIsSearchBarOpen(isOpen)
    // dispatch({ type: FILTER_STATUS, isFilterOpen: !isFilterOpen })
    // setTimeout(() => {
    //   setIsSearchBarOpen(false)
    // }, 2000)
  }

  return (
    <div>
      <div className={`${isSearchBarOpen ? 'blur' : ''}`}
        onClick={() => { onChangeBarDisplay('none', !isSearchBarOpen) }}>

      </div>

      <div className={`search-preview ${isDetailsShown ? 'header-adjust' : ''} ${isSearchBarOpen ? 'search-preview-close' : ''}`}>
        {!isDetailsShown &&
          <div>
            <button onClick={() => { onChangeBarDisplay('Search', true) }}><span>Anywhere</span></button>

            <button onClick={() => { onChangeBarDisplay('Any week', true) }}><span>Any week</span></button>

            <button onClick={() => { onChangeBarDisplay('Add Guests', true) }}
              className="add-guests-btn-header">
              <span>Add guests</span>
              <div onClick={onSearchClick} className="first-search-svg-header">
                <svg viewBox="1 0 32 32" xmlns="https://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'white', strokeWidth: 5.33333, overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
              </div>
            </button>
          </div>
        }

        {isDetailsShown &&
          <button onClick={() => { onChangeBarDisplay('Search', true) }}><span>Start your search</span></button>
        }
        {isDetailsShown &&
          <div onClick={onSearchClick} className="first-search-svg-header">
            {/* <img src={search} alt="search" /> */}
            {/* <span>Add guests</span> */}
            {/* <div className="first-search-svg-header"> */}
            <svg viewBox="1 0 32 32" xmlns="https://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'white', strokeWidth: 5.33333, overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
          </div>

        }
      </div>

      <div className={`search-bar ${isSearchBarOpen ? 'search-bar-open' : ''}`}>

        <div className="search-form-nav-container">
          <button onClick={() => { onChangeBarDisplay() }}>Stays</button>
          <button onClick={() => { onChangeBarDisplay() }}>Experiences</button>
          <button onClick={() => { onChangeBarDisplay() }}>Online Experiences</button>
        </div>

        <div className={`search-form-menu-container ${barFocused && 'bar-focused'}`}>
          <SearchMenu onChangeBarDisplay={onChangeBarDisplay}
            focusBtn={focusBtn}
            isBarFocused={isBarFocused}
          />
        </div>

      </div>

    </div>

  )
}
