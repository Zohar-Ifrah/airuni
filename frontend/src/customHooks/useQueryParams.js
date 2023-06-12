import { useSearchParams } from "react-router-dom"
import { stayService } from "../services/stay.service"

export function useQueryParams() {

    const [searchParams, setSearchParams] = useSearchParams()
    const paramsMap = searchParams.entries()
    const filterBy = stayService.getDefaultFilter()

    for (const [key, value] of paramsMap) {
        filterBy[key] = (isNaN(parseFloat(value))) ? value : parseFloat(value)
    }

    // SET params:
    const updateParams = (filterToEdit) => {
        const params = new URLSearchParams()

        Object.entries(filterToEdit).forEach(([key, value]) => {
            params.append(key, value)
        })

        const queryString = params.toString()


        setSearchParams(queryString)
    }

    return [filterBy, updateParams]
}