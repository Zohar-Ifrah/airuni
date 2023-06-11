import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { utilService } from "../services/util.service"
import { useForm } from "../customHooks/useForm"
import { useNavigate, useSearchParams } from "react-router-dom"
import { CalendarPicker } from "./calendar-picker"
import { AddGuests } from "./add-guests"
import { RegionSearch } from "./region-search"




export function StayFilter({ onSetFilter, onSetSort, onChangeBarDisplay, focusBtn, isBarFocused, isHeaderClicked }) {
  onSetFilter = useRef(utilService.debounce(onSetFilter))
  const navigate = useNavigate()
  const guestsAmount = useRef(0)
  const checkInAndOutDate = useRef({})
  const isDetailsShown = useSelector(storeState => storeState.systemModule.isDetailsShown)
  // const isCheckInRef = useRef(false)
  // const [filterByToEdit, setFilterByToEdit] = useState(useSelector((storeState) => storeState.stayModule.filterBy))
  // const [sortByToEdit, setSortByToEdit] = useState(useSelector((storeState) => storeState.stayModule.sortBy))

  // eslint-disable-next-line
  const [filterByToEdit, setFilterByToEdit, handleChange] =
    useForm(useSelector((storeState) => storeState.stayModule.filterBy), onSetFilter.current)

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams()

  const [isCalendarOpen, setIsCalendarOpen] = useState(focusBtn && focusBtn === 'Any week')
  const [isAddGuestsOpen, setIsAddGuestsOpen] = useState(focusBtn && focusBtn === 'Add Guests')
  const [isSearchOpen, setIsSearchOpen] = useState(focusBtn && focusBtn === 'Search')
  const [isCheckIn, setIsCheckIn] = useState(false)

  const elInputRef = useRef(null)

  useEffect(() => {
    elInputRef.current && elInputRef.current.focus()
    setIsCalendarOpen(focusBtn && focusBtn === 'Any week')
    setIsAddGuestsOpen(focusBtn && focusBtn === 'Add Guests')
    setIsSearchOpen(focusBtn && focusBtn === 'Search')

  }, [focusBtn])

  useEffect(() => {
    isBarFocused(isCalendarOpen || isAddGuestsOpen)

    // eslint-disable-next-line
  }, [isAddGuestsOpen, isCalendarOpen, isSearchOpen, isCheckIn])

  useEffect(() => {
    console.log('FROM isHeaderClicked:', isHeaderClicked)
    setIsSearchOpen(false)
    setIsCalendarOpen(false)
    setIsAddGuestsOpen(false)
  }, [isHeaderClicked])

  function onSubmit(ev) {

    ev.stopPropagation()

    onChangeBarDisplay(false)
    // SET filter:
    onSetFilter.current(filterByToEdit)

    // SET params:
    const params = new URLSearchParams()

    Object.entries(filterByToEdit).forEach(([key, value]) => {
      params.append(key, value)
    })

    const queryString = params.toString()

    setSearchParams(queryString)

    if (isDetailsShown) {
      navigate(`/?${queryString}`)
    }
  }

  function ontoggleCalendar(from) {
    if ((from === 'checkIn' && !isCheckIn) ||
      (from === 'checkOut' && isCheckIn)) {

      setIsAddGuestsOpen(false)
      setIsSearchOpen(false)
      setIsCalendarOpen(!isCalendarOpen)
    } else {
      if (from === 'checkOut') setIsCheckIn(true)

      setIsCalendarOpen(true)
      from === 'checkIn' && setIsCheckIn(false)
    }
  }

  function onOpenGuestsModal() {
    if (isCalendarOpen) setIsCalendarOpen(false)
    if (isSearchOpen) setIsSearchOpen(false)
    setIsAddGuestsOpen(!isAddGuestsOpen)
  }

  function onOpenSearchModal() {
    if (isCalendarOpen) setIsCalendarOpen(false)
    if (isAddGuestsOpen) setIsAddGuestsOpen(false)
    setIsSearchOpen(!isSearchOpen)
  }

  function onSetDates(startDate, endDate) {

    checkInAndOutDate.current = { checkIn: getMonth(startDate), checkOut: getMonth(endDate) }
    setFilterByToEdit({
      ...filterByToEdit,
      checkIn: startDate,
      checkOut: endDate
    })
  }

  function onUpdateCapacity({ capacity }) {

    guestsAmount.current = capacity.adults + capacity.children
    setFilterByToEdit({
      ...filterByToEdit,
      adults: capacity.adults,
      children: capacity.children,
      infants: capacity.infants,
      pets: capacity.pets,
    })
  }

  function onRegionClick(region) {
    setIsSearchOpen(false)

    setIsCalendarOpen(true)
    // setIsCheckIn(true)
    if (region === 'flexible') region = ''
    setFilterByToEdit({
      ...filterByToEdit,
      location: region
    })
  }
  // useEffect(() => {
  //   onSetFilter.current(filterByToEdit)
  //   // eslint-disable-next-line
  // }, [filterByToEdit])

  // useEffect(() => {
  //   onSetSort(sortByToEdit)
  //   // eslint-disable-next-line
  // }, [sortByToEdit])

  // function onLabelChange(selectedLabels) {
  //   setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: selectedLabels }))
  // }

  // function handelSort({ target }) {
  //   let { value, checked, type, name: field, } = target
  //   if (type === 'checkbox') {
  //     checked ? value = 1 : value = -1
  //   }
  //   if (value === 'sort') value = ''

  //   setSortByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  // }

  function guestsMsg() {
    return guestsAmount.current > 1 ? guestsAmount.current + ' guests' : guestsAmount.current + ' guest'
  }

  function getMonth(timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' })
    return formattedDate // Output: Jun 7
  }

  function onCheckInClick(isClicked) {
    setIsCheckIn(isClicked)
  }

  return (
    <section className="filter-header-section">

      <div className={`search-label-header flex justify-center ${isSearchOpen && 'focused'}`}
        onClick={() => { onOpenSearchModal() }}>
        <label htmlFor="location">Where</label>
        <input type="text"
          id="location"
          name="location"
          placeholder="Search destinations"
          value={filterByToEdit.location && filterByToEdit.location}
          onChange={handleChange}
        />
      </div>

      <div className="show-contents">
        {isSearchOpen && <RegionSearch
          onRegionClick={onRegionClick} />}
      </div>


      <div className={`checkin-add-dates-container flex align-center ${isCalendarOpen && !isCheckIn && 'focused'}`}
        onClick={() => { ontoggleCalendar('checkIn') }}>

        <div className="checkin-add-dates flex column justify-center">
          <span> Check in </span>
          <span> {checkInAndOutDate.current.checkIn ? checkInAndOutDate.current.checkIn : 'Add dates'} </span>
        </div>

      </div>
      <div className="show-contents">

        {isCalendarOpen && <CalendarPicker
          onSetDates={onSetDates}
          onCheckInClick={onCheckInClick} />}
      </div>


      <div className={`checkout-add-dates-container flex align-center ${isCalendarOpen && isCheckIn && 'focused'}`}
        onClick={() => { ontoggleCalendar('checkOut') }}>

        <div className="checkout-add-dates flex column justify-center">
          <span> Check out </span>
          <span> {checkInAndOutDate.current.checkOut ? checkInAndOutDate.current.checkOut : 'Add dates'} </span>
        </div>

        {/* {isCalendarOpen && <CalendarPicker key="checkOut" />} */}
      </div>

      <div className={`add-guests-search-main-container flex align-center ${isAddGuestsOpen && 'focused'}`}
        onClick={() => { onOpenGuestsModal() }}>
        <div className="add-guests-search-container flex align-center">
          <div className="add-guests flex column justify-center">
            <span> Who </span>
            <span> {guestsAmount.current ? guestsMsg() : 'Add guests'} </span>
          </div>
          <button onClick={onSubmit}>
            <div className="second-search-svg-header">
              <svg viewBox="1 0 32 32" xmlns="https://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '17px', width: '17px', stroke: 'white', strokeWidth: 4, overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
            </div>
            Search
          </button>
        </div>
      </div>
      <div className="show-contents">
        {isAddGuestsOpen && <AddGuests
          onUpdateCapacity={onUpdateCapacity} />}
      </div>

    </section>
  )
}
