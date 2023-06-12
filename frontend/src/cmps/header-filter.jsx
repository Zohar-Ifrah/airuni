import { useEffect, useState } from "react"
import { SearchMenu } from "./search-menu"
import { useSelector } from "react-redux"

export function HeaderFilter({ onSetFilter, isHeaderClicked }) {

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
  const [focusBtn, setFocusBtn] = useState(null)
  const [barFocused, setBarFocused] = useState(null)
  const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

  useEffect(() => {
    const handleScroll = () => {
      setIsSearchBarOpen(false)
    }

    if (isSearchBarOpen) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isSearchBarOpen])


  function isBarFocused(isFocus) {
    // console.log('isFocus: ', isFocus)
    setBarFocused(isFocus)
  }

  function onSearchClick(ev) {
    ev.stopPropagation()

    onChangeBarDisplay('Search', true)
  }

  function onChangeBarDisplay(focusBtn, isOpen) {

    setFocusBtn(focusBtn)
    setIsSearchBarOpen(isOpen)
  }

  function getMonth(timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' })
    return formattedDate // Output: Jun 7
  }

  function guestsMsg(guestsAmount) {
    return guestsAmount > 1 ? guestsAmount + ' guests' : guestsAmount + ' guest'
  }

  return (
    <div>
      <div className={`${isSearchBarOpen ? 'blur' : ''}`}
        onClick={() => { onChangeBarDisplay('none', !isSearchBarOpen) }}>

      </div>

      <div className={`search-preview ${isDetailsShown ? 'header-adjust' : ''} ${isSearchBarOpen ? 'search-preview-close' : ''}`}>
        {!isDetailsShown &&
          <div>
            <button onClick={() => { onChangeBarDisplay('Search', true) }}>
              <span>
                {filterBy.location ? filterBy.location : 'Anywhere'}
              </span>
            </button>

            <button onClick={() => { onChangeBarDisplay('Any week', true) }}>
              <span>
                {filterBy.checkIn ? getMonth(filterBy.checkIn) + ' - ' + getMonth(filterBy.checkOut) : 'Any week'}
              </span>
            </button>

            <button onClick={() => { onChangeBarDisplay('Add Guests', true) }}
              className="add-guests-btn-header">
              <span className={`${filterBy.adults || filterBy.children ? 'black-circular-regular' : ''}`}>
                {filterBy.adults || filterBy.children ? guestsMsg(filterBy.adults + filterBy.children) :
                  'Add guests'}
              </span>
              <div onClick={onSearchClick} className="first-search-svg-header">
                <svg viewBox="1 0 32 32" xmlns="https://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'white', strokeWidth: 5.33333, overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
              </div>
            </button>
          </div>
        }

        {isDetailsShown &&
          <button onClick={() => { onChangeBarDisplay('Search', true) }}> <span className="details-shown-remove-border"> Start your search </span> </button>
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

        {/* <div className="search-form-nav-container">
          <button onClick={() => { onChangeBarDisplay() }}>Stays</button>
          <button onClick={() => { onChangeBarDisplay() }}>Experiences</button>
          <button onClick={() => { onChangeBarDisplay() }}>Online Experiences</button>
        </div> */}

        <div className={`search-form-menu-container ${barFocused && 'bar-focused'}`}>
          <SearchMenu onChangeBarDisplay={onChangeBarDisplay}
            focusBtn={focusBtn}
            isBarFocused={isBarFocused}
            isHeaderClicked={isHeaderClicked}
          />
        </div>

      </div>

    </div>

  )
}
