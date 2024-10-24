import { useCallback, useReducer } from "react";


const useQueryParams = (createInitialState) => {
    const [params, dispatch] = useReducer(paramsReducer, null, createInitialState);

    const updateFilters = useCallback((value) => {
        dispatch({ type: 'UPDATE_FILTERS', filters: value })
    }, [])

    const updateSearchQuery = useCallback(value => {
        dispatch({ type: 'SEARCH', searchQuery: value })
    }, [])

    const updatePage = useCallback(page => {
        dispatch({ type: 'UPDATE_PAGE', page: page + 1 })
    }, []);

    const updatePerPage = useCallback(perPage => {
        dispatch({ type: 'UPDATE_PER_PAGE', perPage })
    }, []);

    return {
        params,
        updateFilters,
        updateSearchQuery,
        updatePage,
        updatePerPage,
    }
}

const paramsReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_PER_PAGE':
            return ({ ...state, perPage: action.perPage });
        case 'UPDATE_PAGE':
            return ({ ...state, page: action.page });
        case 'SEARCH':
            return ({ ...state, searchQuery: action.searchQuery });
        case 'UPDATE_FILTERS':
            const { hasActiveFilters, ...filters } = action.filters;
            return ({ ...state, hasActiveFilters, filters: filters })
        default:
            throw new Error(`Invalid action '${action.type}'`)
    }
}

export default useQueryParams;