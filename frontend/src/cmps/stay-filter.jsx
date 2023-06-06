import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { utilService } from "../services/util.service"
import { useForm } from "../customHooks/useForm"
import { useSearchParams } from "react-router-dom"
import { CalendarPicker } from "./calendar-picker"
import { AddGuests } from "./add-guests"




export function StayFilter({ onSetFilter, onSetSort, onChangeBarDisplay, focusBtn, isBarFocused }) {
  onSetFilter = useRef(utilService.debounce(onSetFilter))
  const guestsAmount = useRef(0)
  const checkInAndOutDate = useRef({})
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
  const [isCheckIn, setIsCheckIn] = useState(false)

  const elInputRef = useRef(null)

  useEffect(() => {
    elInputRef.current && elInputRef.current.focus()
    setIsCalendarOpen(focusBtn && focusBtn === 'Any week')
    setIsAddGuestsOpen(focusBtn && focusBtn === 'Add Guests')

  }, [focusBtn])

  useEffect(() => {
    isBarFocused(isCalendarOpen || isAddGuestsOpen)
    // console.log(isCheckIn)
    // eslint-disable-next-line
  }, [isAddGuestsOpen, isCalendarOpen, isCheckIn])


  function onSubmit(ev) {

    ev.stopPropagation()
    // console.log('onSubmit: ', filterByToEdit)
    onChangeBarDisplay(false)
    // SET filter:
    onSetFilter.current(filterByToEdit)

    // SET params:
    const params = new URLSearchParams()

    Object.entries(filterByToEdit).forEach(([key, value]) => {
      params.append(key, value)
    })
    const queryString = params.toString()

    // console.log('queryString: ', queryString)
    setSearchParams(queryString)
  }

  function ontoggleCalendar(from) {
    console.log(from)
    if ((from === 'checkIn' && !isCheckIn) || (from === 'checkOut' && isCheckIn)) {
      console.log('enter')
      if (isAddGuestsOpen) setIsAddGuestsOpen(false)
      setIsCalendarOpen(!isCalendarOpen)
      from === 'checkOut' && setIsCheckIn(false)
    } else from === 'checkIn' ? setIsCheckIn(false) : setIsCheckIn(true)
  }

  function onOpenGuestsModal() {
    if (isCalendarOpen) setIsCalendarOpen(false)
    setIsAddGuestsOpen(!isAddGuestsOpen)
  }

  function onSetDates(startDate, endDate) {
    // console.log('startDate: ', startDate)
    // console.log('endDate: ', endDate)

    checkInAndOutDate.current = { checkIn: getMonth(startDate), checkOut: getMonth(endDate) }
    setFilterByToEdit({
      ...filterByToEdit,
      checkIn: startDate,
      checkOut: endDate
    })
  }

  function onUpdateCapacity({ capacity }) {
    // console.log(capacity)
    guestsAmount.current = capacity.adults + capacity.children
    setFilterByToEdit({
      ...filterByToEdit,
      adults: capacity.adults,
      children: capacity.children,
      infants: capacity.infants,
      pets: capacity.pets,
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
    console.log(isClicked)
    setIsCheckIn(isClicked)
    // isCheckInRef.current = isClicked
  }

  return (
    <section className="filter-header-section">
      <div className="search-label-header flex justify-center">
        <label htmlFor="location">Where</label>
        <input type="text"
          id="location"
          name="location"
          placeholder="Search destinations"
          value={filterByToEdit.name}
          onChange={handleChange}
        />
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


      <div className={`checkout-add-dates-container flex align-center ${isCheckIn && 'focused'}`}
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
          <button onClick={onSubmit}> Search </button>
        </div>
      </div>
      <div className="show-contents">
        {isAddGuestsOpen && <AddGuests
          onUpdateCapacity={onUpdateCapacity} />}
      </div>

    </section>
  )
}
