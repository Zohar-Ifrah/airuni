import { useState } from "react"


export function HeaderFilter({ onSetFilter }) {

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

  function onChangeBarDisplay() {
    setIsSearchBarOpen(true)
    console.log(isSearchBarOpen)
  }

  return (
    <div>
      {/* <div className={`search-bars ${isSearchBarOpen ? 'search-bars-open' : ''}`}>
        <button onClick={() => { onChangeBarDisplay() }}>Anywhere</button>
        <button onClick={() => { onChangeBarDisplay() }}>Any week</button>
        <button onClick={() => { onChangeBarDisplay() }}>Add Guests</button>
      </div> */}

      <div className={`search-bars ${isSearchBarOpen ? 'search-bars-open' : ''}`}>
        <button onClick={() => { onChangeBarDisplay() }}>Stays</button>
        <button onClick={() => { onChangeBarDisplay() }}>Experiences</button>
        <button onClick={() => { onChangeBarDisplay() }}>Online Experiences</button>
      </div>
    </div>

  )
}
