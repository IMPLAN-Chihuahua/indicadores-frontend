import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import qs from 'qs';

const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateFilters = useCallback((value) => {
        const current = qs.parse(searchParams.toString());

        const newState = {
            ...value,
            page: 1,
            perPage: current.perPage || 25
        };

        const queryStr = qs.stringify(newState, { skipNulls: true });
        setSearchParams(queryStr);
    }, [searchParams, setSearchParams]);

    const updatePage = useCallback(page => {
        const current = qs.parse(searchParams.toString());
        const newState = {
            ...current,
            page: page + 1,
        };
        setSearchParams(qs.stringify(newState, { skipNulls: true }));
    }, [searchParams, setSearchParams]);

    const updatePerPage = useCallback(perPage => {
        const current = qs.parse(searchParams.toString());
        const newState = {
            ...current,
            perPage,
            page: 1,
        };
        setSearchParams(qs.stringify(newState, { skipNulls: true }));
    }, [searchParams, setSearchParams]);


    let parsedParams = qs.parse(searchParams.toString());
    let page = parseInt(parsedParams.page) || 1;
    let perPage = parseInt(parsedParams.perPage) || 25;

    const { page: _p, perPage: _pp, ...filters } = parsedParams;

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