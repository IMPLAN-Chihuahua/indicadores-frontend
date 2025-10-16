import { useCallback, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import qs from 'qs'


const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateFilters = (values) => {
        setSearchParams(qs.stringify(values))
    }

    const updatePage = page => {
        setSearchParams((prev) => ({ ...qs.parse(prev.toString()), page }));
    }

    const updatePerPage = perPage => {
        setSearchParams((prev) => ({ ...qs.parse(prev.toString()), perPage }));
    }

    const { page, perPage, ...filters } = qs.parse(searchParams.toString());
    
    let _page = parseInt(page);
    let _perPage = parseInt(perPage);
    if (isNaN(_page)) {
        _page = 1;
    }
    if (isNaN(_perPage)) {
        _perPage = 25;
    }
    
    return {
        params: {
            page: _page,
            perPage: _perPage,
            filters
        },
        updateFilters,
        updatePage,
        updatePerPage,
    }
}

const useSearch = () => {
    const [search, setSearch] = useState();
    const updateSearchQuery = useCallback(value => {
        setSearch(value)
    }, [])

    return {
        searchQuery: search,
        updateSearchQuery
    }
}

export default useQueryParams;

export { useSearch };