import { IUserRegister, IUserLogin, IUser, IProfile, IPassword, IForgotPassword, IChangePassword, ILogout } from '@/interfaces'
import BaseService, { NoAuthServcie } from "./BaseService"

const servicePrefix = "/auth"

const Auth = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const apiRegister = (data: IUserRegister) => {
    return NoAuthServcie.post(`${servicePrefix}/register/`, data)
}

export const apiLogin =  (data: IUserLogin) => {
    return NoAuthServcie.post(`${servicePrefix}/login/`, data)
}

export const apiRefreshToken =  (data: { refresh: string }) => {
    return BaseService.post(`${servicePrefix}/token/refresh/`, data)
}

export const apiForgotPassword =  (data: IForgotPassword) => {
    return NoAuthServcie.post(`${servicePrefix}/password/reset/`, data)
}

export const apiChangePassword =  (data: IChangePassword) => {
    return NoAuthServcie.patch(`${servicePrefix}/password/reset/complete/`, data)
}

export const apiGetUser =  (token: string) => {
    return BaseService.get<IProfile>(`${servicePrefix}/user/`, Auth(token))
}

export const apiUpdateUser =  (data: IProfile, token?: string) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => formData.append(key, data[key as keyof IProfile]))

    return BaseService.patch<IUser>(`${servicePrefix}/user/`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })
}

export const apiUpdatePassword =  (data: IPassword, token?: string) => {
    return BaseService.patch(`${servicePrefix}/password/change/`, data, Auth(token!))
}

export const apiLogout =  (data: ILogout) => {
    return BaseService.post(`${servicePrefix}/sign-out?refresh_token=${data.refresh_token}&userType=${data.userType}`)
}

