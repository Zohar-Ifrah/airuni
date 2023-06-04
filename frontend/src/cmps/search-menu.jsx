import { useDispatch } from "react-redux";

import { StayFilter } from "./stay-filter";
import { FILTER_BY } from "../store/stay.reducer";

export function SearchMenu({onChangeBarDisplay}) {

    const dispatch = useDispatch()

    function onSetFilter(filterToEdit) {
        dispatch({ type: FILTER_BY, filterToEdit })
    }

    return (
        <div className="search-form-menu-btn-container">
            <StayFilter onSetFilter={onSetFilter} onChangeBarDisplay={onChangeBarDisplay} />
            {/* <button>
                <StayFilter onSetFilter={onSetFilter} />
            </button>
            <button><span> Check in </span> <span> Add dates </span></button>
            <button> <span> Check out </span> <span>Add dates</span></button>
            <button> <div> <span> Who </span> <span> Add guests </span> </div> <button> Search </button> </button> */}
        </div>
    )
}
