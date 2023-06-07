import { useDispatch } from "react-redux"

import { StayFilter } from "./stay-filter"
import { FILTER_BY } from "../store/stay.reducer"

export function SearchMenu({ onChangeBarDisplay, focusBtn, isBarFocused }) {

    const dispatch = useDispatch()

    function onSetFilter(filterToEdit) {
        dispatch({ type: FILTER_BY, filterToEdit })
    }

    return (
        <div className="search-form-menu-btn-container">
            <StayFilter onSetFilter={onSetFilter}
                onChangeBarDisplay={onChangeBarDisplay}
                focusBtn={focusBtn}
                isBarFocused={isBarFocused}
            />
        </div>
    )
}
