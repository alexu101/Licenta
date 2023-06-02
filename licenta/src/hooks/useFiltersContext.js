import { FiltersContext } from "../context/FiltersContext"
import { useContext } from "react"

export const useFiltersContext = () => {
    const context = useContext(FiltersContext)

    if (!context) {
        throw Error('useFiltersContext must be used inside a FiltersContextProvider')
    }

    return context
}