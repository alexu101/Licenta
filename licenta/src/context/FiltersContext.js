import { createContext, useReducer, useEffect } from 'react'

export const FiltersContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILTERS':
            return { filters: action.payload }
        case 'CLEAR_FILTERS':
            return { filters: null }
        default:
            return state
    }
}

export const FiltersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        filters: null
    })

    useEffect(() => {
        const filters = JSON.parse(localStorage.getItem('filters'))

        if (filters) {
            dispatch({ type: 'SET_FILTERS', payload: filters })
        }
    }, [])

    return (
        <FiltersContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FiltersContext.Provider>
    )
}