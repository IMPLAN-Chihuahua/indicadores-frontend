import { useMemo, useState, useEffect } from "react";
import useSWRImmutable from 'swr/immutable';
import qs from 'qs';
import { fetcher } from "../services/indicatorService";

export const useResourceList = (props) => {
    const { perPage = 25, page = 1, searchQuery = '', resource = '', ...filters } = props || {};
    const queryParams = useMemo(() => qs.stringify({
        perPage,
        page,
        searchQuery,
        ...filters
    }, {
        skipNulls: true,
        addQueryPrefix: true,
    }), [searchQuery, page, perPage, filters])
    const { data: res, error, mutate } = useSWRImmutable(`/${resource}/info/general${queryParams.toString()}`, fetcher)

    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [resources, setResources] = useState([])

    useEffect(() => {
        if (!res) return;
        setResources(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
    }, [res])

    return {
        resources,
        isLoading: !error && !res,
        hasError: error,
        total,
        totalPages,
        mutate
    }

}