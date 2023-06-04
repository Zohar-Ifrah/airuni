import { useState } from "react"
import { SearchMenu } from "./search-menu"
import { useSelector } from "react-redux"


export function HeaderFilter({ onSetFilter }) {

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)


  function onChangeBarDisplay(isOpen) {

    setIsSearchBarOpen(isOpen)
    // dispatch({ type: FILTER_STATUS, isFilterOpen: !isFilterOpen })
    // setTimeout(() => {
    //   setIsSearchBarOpen(false)
    // }, 2000);
    console.log(isSearchBarOpen)
  }

  return (
    <div>
      <div className={`${isSearchBarOpen ? 'blur' : ''}`}
        onClick={() => { onChangeBarDisplay(!isSearchBarOpen) }}></div>
      <div className={`search-preview ${isSearchBarOpen ? 'search-preview-close' : ''}`}>
        <button onClick={() => { onChangeBarDisplay(true) }}>Anywhere</button>
        <button onClick={() => { onChangeBarDisplay(true) }}>Any week</button>
        <button onClick={() => { onChangeBarDisplay(true) }}>Add Guests</button>
      </div>

      <div className={`search-bars ${isSearchBarOpen ? 'search-bars-open' : ''}`}>

        <div className="search-form-nav-container">
          <button onClick={() => { onChangeBarDisplay() }}>Stays</button>
          <button onClick={() => { onChangeBarDisplay() }}>Experiences</button>
          <button onClick={() => { onChangeBarDisplay() }}>Online Experiences</button>
        </div>

        <div className="search-form-menu-container">
          <SearchMenu onChangeBarDisplay={onChangeBarDisplay} />
        </div>

      </div>

    </div>

  )
}
