import { useState } from "react"
import { SearchMenu } from "./search-menu"


export function HeaderFilter({ onSetFilter }) {

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

  function onChangeBarDisplay() {
    setIsSearchBarOpen(true)
    console.log(isSearchBarOpen)
  }

  return (
    <div>
      {/* <div className={`search-bars ${isSearchBarOpen ? 'search-bars-open' : ''}`}>
        <button onClick={() => { onChangeBarDisplay('toAddFocus') }}>Anywhere</button>
        <button onClick={() => { onChangeBarDisplay('toAddFocus') }}>Any week</button>
        <button onClick={() => { onChangeBarDisplay('toAddFocus') }}>Add Guests</button>
      </div> */}

      <div className={`search-bars ${isSearchBarOpen ? 'search-bars-open' : ''}`}>

        <div className="search-form-nav-container">
          <button onClick={() => { onChangeBarDisplay() }}>Stays</button>
          <button onClick={() => { onChangeBarDisplay() }}>Experiences</button>
          <button onClick={() => { onChangeBarDisplay() }}>Online Experiences</button>
        </div>

        <div className="search-form-menu-container">
          <SearchMenu />
        </div>

      </div>

    </div>

  )
}
