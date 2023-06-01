import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { stayService } from '../services/stay.service.js'
import { stayService } from '../services/stay.service.local.js'
// import { Link } from 'react-router-dom'
import { StayFilter } from '../cmps/stay-filter.jsx'
import { FILTER_BY } from '../store/stay.reducer.js'
import { StayList } from '../cmps/stay-list.jsx'

export function StayIndex() {
    const dispatch = useDispatch()
    const stays = useSelector(storeState => storeState.stayModule.stays)
    // const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

    useEffect(() => {
        loadStays()
    }, [])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.name = prompt('name?')
        stay.price = +prompt('price?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const price = +prompt('New price?')
        const stayToSave = { ...stay, price }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    // function onAddToCart(stay) {
    //     console.log(`Adding ${stay.vendor} to Cart`)
    //     addToCart(stay)
    //     showSuccessMsg('Added to Cart')
    // }

    // function onAddStayMsg(stay) {
    //     console.log(`TODO Adding msg to stay`)
    // }

    function onSetFilter(filterToEdit) {
        dispatch({ type: FILTER_BY, filterToEdit })
    }

    function onSetSort(sortToEdit) {
        console.log('FUNCTION: onSetSort TO EDIT')
        // dispatch({ type: SORT_BY, sortToEdit })
    }

    return (
        <div className="stay-index-container">
            <StayFilter
                onSetFilter={onSetFilter}
                onSetSort={onSetSort} />
            <button onClick={onAddStay}>Add Stay</button>
            <StayList
                stays={stays}
                onRemoveStay={onRemoveStay}
                onUpdateStay={onUpdateStay}/>
        </div>
    )
}