import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { utilService } from "../services/util.service"
import { useForm } from "../customHooks/useForm"
import { useSearchParams } from "react-router-dom"
import { CalendarPicker } from "./calendar-picker"
import { AddGuests } from "./add-guests"



export function StayFilter({ onSetFilter, onSetSort }) {
  onSetFilter = useRef(utilService.debounce(onSetFilter))

  // const [filterByToEdit, setFilterByToEdit] = useState(useSelector((storeState) => storeState.stayModule.filterBy))
  // const [sortByToEdit, setSortByToEdit] = useState(useSelector((storeState) => storeState.stayModule.sortBy))
  // eslint-disable-next-line

  const [filterByToEdit, setFilterByToEdit, handleChange] =
    useForm(useSelector((storeState) => storeState.stayModule.filterBy), onSetFilter.current)

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
      <div className="search-label-header">
        <label htmlFor="location">Where</label>
        <input type="text"
          id="location"
          name="location"
          placeholder="Search destinations"
          value={filterByToEdit.name}
          onChange={handleChange}
        />
      </div>


      <div>
        <div onClick={() => { ontoggleCalendar('checkIn') }}><span> Check in </span> <span> Add dates </span></div>
        {isCalendarOpen && <CalendarPicker />}
      </div>
      <div>
        <div onClick={() => { ontoggleCalendar('checkOut') }}> <span> Check out </span> <span>Add dates</span></div>
        {/* {isCalendarOpen && <CalendarPicker key="checkOut" />} */}
      </div>
      <div>
        <div onClick={() => { onOpenGuestsModal() }}> <div> <span> Who </span> <span> Add guests </span> </div>
          <div onClick={onSubmit}> Search </div> </div>
        {isAddGuestsOpen && <AddGuests
          filterByToEdit={filterByToEdit}
          handleChange={handleChange} />}
      </div>

    </section>
  )

  // <section className="stay-filter-container fully">
  //   <p>Filters:</p>
  //   {/* capacity */}

  //   <label htmlFor="price">Price range</label>
  //   <input type="number"
  //     id="price"
  //     name="price"
  //     placeholder="By Price"
  //     value={filterByToEdit.price}
  //     onChange={handleChange}
  //   />

  {/* <label htmlFor="name">Name:</label>
      <input type="text"
        id="name"
        name="name"
        placeholder="Enter name..."
        value={filterByToEdit.name}
        onChange={handleChange}
      />

      <label htmlFor="inStock">In stock</label>
      <input type="checkbox"
        id="inStock"
        name="inStock"
        checked={filterByToEdit.inStock}
        onChange={handleChange}
      /> */}

  {/* <LabelSelector onLabelChange={onLabelChange} filterByToEdit={filterByToEdit} />

      <section>
        <label htmlFor="desc">Desc</label>
        <input type="checkbox"
          id="desc"
          name="desc"
          checked={sortByToEdit.desc > 0}
          onChange={handelSort}
        />
        <select onChange={handelSort} className="txt-input" name="type" id="sort">
          <option value="sort">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created At</option>
        </select>
      </section> */}

  {/* <button className="btn"><Link to="/stay/edit">Add Stay</Link></button> */ }
  // </section>

}
