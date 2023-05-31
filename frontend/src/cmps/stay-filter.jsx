import { useEffect, useRef, useState } from "react"
// import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { utilService } from "../services/util.service"
// import { LabelSelector } from "./label-select"
import { useForm } from "../customHooks/useForm"




export function StayFilter({ onSetFilter, onSetSort }) {
  onSetFilter = useRef(utilService.debounce(onSetFilter))

  // const [filterByToEdit, setFilterByToEdit] = useState(useSelector((storeState) => storeState.stayModule.filterBy))
  const [sortByToEdit, SetSortByToEdit] = useState(useSelector((storeState) => storeState.stayModule.sortBy))
  const [filterByToEdit, setFilterByToEdit, handleChange] =
    useForm(useSelector((storeState) => storeState.stayModule.filterBy), onSetFilter.current)


  const elInputRef = useRef(null)

  useEffect(() => {
    elInputRef.current && elInputRef.current.focus()
  }, [])


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

  //   SetSortByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  // }


  return (
    <section className="stay-filter-container fully">
      <p>Filters:</p>
      {/* capacity */}

      <label htmlFor="price">Price range</label>
      <input type="number"
        id="price"
        name="price"
        placeholder="By Price"
        value={filterByToEdit.price}
        onChange={handleChange}
      />

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

      {/* <button className="btn"><Link to="/stay/edit">Add Stay</Link></button> */}
    </section>
  )
}
