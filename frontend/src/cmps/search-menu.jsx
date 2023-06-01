import { useDispatch } from "react-redux";

import { StayFilter } from "./stay-filter";
import { FILTER_BY } from "../store/stay.reducer";

export function SearchMenu() {
    const dispatch = useDispatch()
    function onSetFilter(filterToEdit) {
        dispatch({ type: FILTER_BY, filterToEdit })
    }

    return (
        <div className="search-form-menu-btn-container">
            <button> 
            <StayFilter onSetFilter = {onSetFilter}/>
            </button>
            <button>Check in <span>Add dates</span></button>
            <button>Check out <span>Add dates</span></button>
            <button>Who <span>Add guests</span><button>Search</button></button>
            

        </div>

    )
}
