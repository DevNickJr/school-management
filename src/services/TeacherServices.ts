import { IAuthContext } from "@/providers/AuthProvider"
import BaseService from "./BaseService"
import { IAddTeacher, ITeacher } from "@/interfaces"

const servicePrefix = "/teachers"
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

export const apiAddTeacher =  (data: IAddTeacher) => {
    return BaseService.post(`${servicePrefix}`, data, Auth(token))
}

export const apiGetTeachers =  () => {
    return BaseService.get(`${servicePrefix}`, Auth(token))
}

export const apiGetAllTeachers  =  () => {
    return BaseService.get(`${servicePrefix}/all`, Auth(token))
}
