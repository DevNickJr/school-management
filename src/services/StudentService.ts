import { IAuthContext } from "@/providers/AuthProvider"
import BaseService from "./BaseService"
import { IStudent } from "@/interfaces"

const servicePrefix = "/students"
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

export const apiAddStudent =  (data: IStudent) => {
    return BaseService.post(`${servicePrefix}`, data, Auth(token))
}

export const apiGetStudents =  () => {
    return BaseService.get(`${servicePrefix}`, Auth(token))
}
