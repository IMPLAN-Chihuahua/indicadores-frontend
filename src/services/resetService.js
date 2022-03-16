import useSWR from 'swr'
import { publicApi } from '.'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useSendEmail = () =>{
    const {data, error} = useSWR('/api/v1/auth/password-reset', fetcher)
    return {
        data,
        isLoading: !data && !error,
        isError: error,
    }
}