import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { utilService } from "../services/util.service"
import { useForm } from "../customHooks/useForm"
import { useSearchParams } from "react-router-dom"
import { CalendarPicker } from "./calendar-picker"
import { AddGuests } from "./add-guests"



export function StayFilter({ onSetFilter, onSetSort, onChangeBarDisplay }) {
  onSetFilter = useRef(utilService.debounce(onSetFilter))

  // const [filterByToEdit, setFilterByToEdit] = useState(useSelector((storeState) => storeState.stayModule.filterBy))
  // const [sortByToEdit, setSortByToEdit] = useState(useSelector((storeState) => storeState.stayModule.sortBy))

  // eslint-disable-next-line
  const [filterByToEdit, setFilterByToEdit, handleChange] =
    useForm(useSelector((storeState) => storeState.stayModule.filterBy), onSetFilter.current)

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams()

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isAddGuestsOpen, setIsAddGuestsOpen] = useState(false)

  const elInputRef = useRef(null)

  useEffect(() => {
    elInputRef.current && elInputRef.current.focus()
  }, [])

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

  function ontoggleCalendar() {
    setIsCalendarOpen(!isCalendarOpen)
  }

  function onOpenGuestsModal() {
    setIsAddGuestsOpen(!isAddGuestsOpen)
  }

  function onSelectDate(date) {
    console.log('date: ', date)
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


      <div className="checkin-add-dates-container flex align-center">
        <div className="checkin-add-dates flex column justify-center" onClick={() => { ontoggleCalendar('checkIn') }}><span> Check in </span> <span> Add dates </span></div>
        {isCalendarOpen && <CalendarPicker onSelectDate={onSelectDate} />}
      </div>

      <div className="checkout-add-dates-container flex align-center">
        <div className="checkout-add-dates flex column justify-center" onClick={() => { ontoggleCalendar('checkOut') }}> <span> Check out </span> <span>Add dates</span></div>
        {/* {isCalendarOpen && <CalendarPicker key="checkOut" />} */}
      </div>

      <div className="flex align-center">
        <div className="add-guests-search-container flex align-center" onClick={() => { onOpenGuestsModal() }}>
          <div className="add-guests flex column justify-center">
            <span> Who </span>
            <span> Add guests </span>
          </div>
          <button onClick={onSubmit}> Search </button>
        </div>
        {isAddGuestsOpen && <AddGuests
          filterByToEdit={filterByToEdit}
          handleChange={handleChange} />}
      </div>

    </section>
  )
}
