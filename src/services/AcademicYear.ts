import { IAuthContext } from "@/providers/AuthProvider"
import BaseService from "./BaseService"
import { IAcademicYear } from "@/interfaces"

const servicePrefix = "/academic-year"
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

// Add a new academic year
export const apiAddAcademicYear = (data: IAcademicYear) => {
    return BaseService.post(`${servicePrefix}`, data, Auth(token))
}

// Get all academic years
export const apiGetAcademicYears = () => {
    return BaseService.get(`${servicePrefix}`, Auth(token))
}

// Get the active academic year
export const apiGetActiveAcademicYear = () => {
    return BaseService.get(`${servicePrefix}/active`, Auth(token))
}

// Activate an academic year by ID
export const apiActivateAcademicYear = (id: string) => {
    return BaseService.patch(`${servicePrefix}/${id}/activate`, {}, Auth(token))
}

// Deactivate an academic year by ID
export const apiDeactivateAcademicYear = (id: string) => {
    return BaseService.patch(`${servicePrefix}/${id}/deactivate`, {}, Auth(token))
}