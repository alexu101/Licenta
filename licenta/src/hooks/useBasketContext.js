import { BasketContext } from "../context/BasketContext"
import { useContext } from "react"

export const useBasketContext = () => {
    const context = useContext(BasketContext)

    if (!context) {
        throw Error('useBasketContext must be used inside a BasketContextProvider')
    }

    return context
}