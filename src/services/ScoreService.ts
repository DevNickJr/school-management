import { IAuthContext } from "@/providers/AuthProvider"
import BaseService from "./BaseService"
import { IScore } from "@/interfaces"

const servicePrefix = "/scores"
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

export const apiAddScore =  (data: IScore) => {
    return BaseService.post(`${servicePrefix}`, data, Auth(token))
}

export const apiGetScores =  () => {
    return BaseService.get(`${servicePrefix}`, Auth(token))
}

export const apiGetSubjectScores = ({
    classSubject,
    term,
    academicYear,
}: {
    classSubject: string;
    term: string;
    academicYear: string;
}) => {
    return BaseService.get(`${servicePrefix}/subjects/${classSubject}?term=${term}&academicYear=${academicYear}`, Auth(token))
}

export const apiGetStudentScores = ({
    classStudent,
    term,
    academicYear,
}: {
    classStudent: string;
    term: string;
    academicYear: string;
}) => {
    return BaseService.get(`${servicePrefix}/students/${classStudent}?term=${term}&academicYear=${academicYear}`, Auth(token))
}
