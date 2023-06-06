// eslint-disable-next-line
import { loadStays, addStay, updateStay, removeStay } from '../store/stay.actions.js'
// import { stayService } from '../services/stay.service.local.js'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { FILTER_BY } from '../store/stay.reducer.js'
import { StayList } from '../cmps/stay-list.jsx'
import { LabelsFilter } from '../cmps/labels-filter.jsx'
import { SET_DETAILS_UNSHOWN } from '../store/system.reducer.js'
import { stayService } from '../services/stay.service.local.js'

export function StayIndex() {
    const dispatch = useDispatch()
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const [searchParams] = useSearchParams()
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)



    // First load
    useEffect(() => {
        const paramsMap = searchParams.entries()
        const filterBy = stayService.getDefaultFilter()

        for (const [key, value] of paramsMap) {
            filterBy[key] = (isNaN(parseFloat(value))) ? value : parseFloat(value)
        }
        onSetFilter(filterBy)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch({ type: SET_DETAILS_UNSHOWN })
        loadStays(filterBy)
        // eslint-disable-next-line
    }, [filterBy])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    // async function onAddStay() {
    //     const stay = stayService.getEmptyStay()
    //     stay.name = prompt('name?')
    //     stay.price = +prompt('price?')
    //     try {
    //         const savedStay = await addStay(stay)
    //         showSuccessMsg(`Stay added (id: ${savedStay._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add stay')
    //     }
    // }

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

    // function onAddStayMsg(stay) {
    //     console.log(`TODO Adding msg to stay`)
    // }

    function onSetFilter(filterToEdit) {
        dispatch({ type: FILTER_BY, filterToEdit })
    }

    // function onSetSort(sortToEdit) {
    //     console.log('FUNCTION: onSetSort TO EDIT')
    //     // dispatch({ type: SORT_BY, sortToEdit })
    // }

    return (
        <div className="stay-index-container">
            
            <LabelsFilter onSetFilter={onSetFilter} />

            {/* <button onClick={onAddStay}>Add Stay</button> */}

            <StayList
                stays={stays}
                onRemoveStay={onRemoveStay}
                onUpdateStay={onUpdateStay} />
        </div>
    )
}