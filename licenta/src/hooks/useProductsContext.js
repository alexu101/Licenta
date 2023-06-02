import { ProductsContext } from "../context/ProductsContext"
import { useContext } from "react"

export const useProductsContext = () => {
    const context = useContext(ProductsContext)

    // console.log(context)

    if (!context) {
        throw Error('useProductsContext must be used inside a ProductsContextProvider')
    }

    return context
}