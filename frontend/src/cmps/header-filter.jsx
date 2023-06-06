import { useEffect, useState } from "react"
import { SearchMenu } from "./search-menu"
import search from '../assets/img/search.svg'

export function HeaderFilter({ onSetFilter }) {

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
  const [focusBtn, setFocusBtn] = useState(null)
  const [barFocused, setBarFocused] = useState(null)

  useEffect(() => {

  }, [barFocused])

  function isBarFocused(isFocus) {
    // console.log('isFocus: ', isFocus)
    setBarFocused(isFocus)
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
        onClick={() => { onChangeBarDisplay(!isSearchBarOpen) }}>

      </div>

      <div className={`search-preview ${isSearchBarOpen ? 'search-preview-close' : ''}`}>

        <button onClick={() => { onChangeBarDisplay('Anywhere', true) }}>Anywhere</button>

        <button onClick={() => { onChangeBarDisplay('Any week', true) }}>Any week</button>

        <button onClick={() => { onChangeBarDisplay('Add Guests', true) }}
          className="add-guests-btn-header">
          <span>Add Guests</span>
          <div className="first-search-svg-header">
            <img src={search} alt="search" />
          </div>
        </button>
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
            isBarFocused={isBarFocused} />
        </div>

      </div>

    </div>

  )
}
