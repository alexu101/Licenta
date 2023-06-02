import { createContext, useReducer } from 'react'

export const ProductsContext = createContext()

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'CREATE_PRODUCT':
            return {
                ...state,
                products: [action.payload, ...state.products]
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(w => w._id !== action.payload._id)
            }
        case 'SET_PRODUCT':
            return {
                ...state,
                desiredProduct: action.payload
            }
        default:
            return state
    }
}

export const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, {
        products: null,
        desiredProduct: null
    })

    return (
        <ProductsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductsContext.Provider>
    )
}