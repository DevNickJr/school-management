import { IAuthContext } from "@/providers/AuthProvider"
import BaseService from "./BaseService"
import { IAddClassSubject, IClass, IStudent } from "@/interfaces"

const servicePrefix = "/classes"
// const studentPrefix = "/class-students"
// const subjectPrefix = "/class-subjects"

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

export const apiGetClass =  ({ id }: { id: string }) => {
    return BaseService.get(`${servicePrefix}/${id}`, Auth(token))
}

export const apiGetAllClasses =  () => {
    return BaseService.get(`${servicePrefix}/all`, Auth(token))
}

export const apiAddSubjectToClass =  (data: IAddClassSubject) => {
    return BaseService.post(`${servicePrefix}/subjects`, data, Auth(token))
}

export const apiGetClassSubjects =  ({ id }: { id: string }) => {
    return BaseService.get(`${servicePrefix}/${id}/subjects`, Auth(token))
}

export const apiGetClassSubject =  ({ id }: { id: string }) => {
    return BaseService.get(`${servicePrefix}/subjects/${id}`, Auth(token))
}

export const apiGetTeacherSubjects =  ({ teacherId }: { teacherId: string }) => {
    return BaseService.get(`${servicePrefix}/teachers/${teacherId}/subjects`, Auth(token))
}

export const apiAddStudent =  (data: IStudent) => {
    return BaseService.post(`${servicePrefix}/students`, data, Auth(token))
}

export const apiGetClassStudents =  ({ id, academicYear }: { id: string; academicYear: string }) => {
    return BaseService.get(`${servicePrefix}/${id}/students/academic-year/${academicYear}`, Auth(token))
}