import {useQuery} from '@tanstack/react-query'
import {AxiosResponse} from 'axios'

interface IProps<T> {
    api: (a?: any, b?: any) => Promise<AxiosResponse<T, any>>
    param?: any
    key: string[]
    onSuccess?: (a: any) => void
    requireAuth?: boolean
    select?: (a: any) => T,
    enabled?: boolean
}

const useFetch = <T, >({api, param, key, onSuccess, requireAuth, select, enabled, ...rest}: IProps<T>) => {

    const {data, error, isLoading, isSuccess, isFetching, refetch, fetchStatus} = useQuery({
        queryKey: [...key],
        enabled: typeof enabled === 'undefined' ? true : enabled,
        queryFn: () => api(param),
        select: select || ((d: any): T => d?.data),
        ...rest
    })
    return {data, error, isLoading, isFetching, refetch, fetchStatus}
}

export default useFetch