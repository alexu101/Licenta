import { createContext, useReducer } from 'react'

export const BasketContext = createContext()

export const basketReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BASKET':
            return {
                ...state,
                basket: action.payload
            }
        case 'CREATE_BASKET':
            return {
                ...state,
                basket: [action.payload, ...state.basket]
            }
        case 'DELETE_BASKET':
            return {
                ...state,
                basket: state.basket.filter(w => w._id !== action.payload._id)
            }
        case 'SET_BASKET_PRODUCTS':
            return {
                ...state,
                basketProducts: action.payload
            }

        default:
            return state
    }
}

export const BasketContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(basketReducer, {
        basket: null,
        basketProducts: null
    })

    return (
        <BasketContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BasketContext.Provider>
    )
}