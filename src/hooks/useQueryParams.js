import { useCallback, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import qs from 'qs'


const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateFilters = useCallback((value) => {
        setSearchParams(() => {
            return new URLSearchParams(qs.stringify(value))
        })
    }, [searchParams])


    const updatePage = useCallback(page => {
        setSearchParams((prev) => {
            return new URLSearchParams({
                ...Object.fromEntries(prev.entries()),
                page: page + 1,
            })
        })
    }, [searchParams]);

    const updatePerPage = useCallback(perPage => {
        setSearchParams((prev) => {
            return new URLSearchParams({
                ...Object.fromEntries(prev.entries()),
                perPage,
            })
        })
    }, [searchParams]);


    let { page, perPage, ...filters } = qs.parse(searchParams.toString())
    page = parseInt(page) || 1;
    perPage = parseInt(perPage) || 25;

    return {
        params: {
            page,
            perPage,
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