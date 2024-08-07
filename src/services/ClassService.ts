import { IAuthContext } from "@/providers/AuthProvider"
import BaseService from "./BaseService"
import { IClass } from "@/interfaces"

const servicePrefix = "/classes"
let user: string | null = '{}'
if (typeof window !== 'undefined') {
    user = localStorage && localStorage?.getItem('user')
}
const token = (JSON.parse(user || '{}') as IAuthContext).accessToken || ''

const Auth = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const apiAddClass =  (data: IClass) => {
    return BaseService.post(`${servicePrefix}`, data, Auth(token))
}

export const apiGetClasses =  () => {
    return BaseService.get(`${servicePrefix}`, Auth(token))
}
export const apiGetAllClasses =  () => {
    return BaseService.get(`${servicePrefix}/all`, Auth(token))
}
