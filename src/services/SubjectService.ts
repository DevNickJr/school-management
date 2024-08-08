import { IAuthContext } from "@/providers/AuthProvider"
import BaseService from "./BaseService"
import { ISubject } from "@/interfaces"

const servicePrefix = "/subjects"
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

export const apiAddSubject =  (data: ISubject) => {
    return BaseService.post(`${servicePrefix}`, data, Auth(token))
}

export const apiGetSubjects =  () => {
    return BaseService.get(`${servicePrefix}`, Auth(token))
}
export const apiGetAllSubjects =  () => {
    return BaseService.get(`${servicePrefix}/all`, Auth(token))
}
