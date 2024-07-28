"use client"
import { ReactNode, Reducer, createContext, useEffect, useReducer } from "react";

export interface IAuthContext {
    isLoggedIn: boolean
    accessToken: string | null
    refreshToken: string | null
    role: string | null
    userType: "customer" | "operator" | "agent" | "admin" | "driver" | null
}

let user = null

if (typeof window !== "undefined" && localStorage) {
    user = localStorage.getItem("user") 
}

const initialState: IAuthContext = user ? JSON.parse(user) : {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    role: null
};

interface IAction {
    type: "LOGIN" | "LOGOUT"
    payload: Omit<IAuthContext, "isLoggedIn"> | null
}

interface IAuthContextProvider extends IAuthContext {
    dispatch: React.Dispatch<IAction>
}


const initAuthContext: IAuthContextProvider = {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    role: null,
    userType: null,
    dispatch: (): void => {}
}

export const AuthContext = createContext<IAuthContextProvider>(initAuthContext)



export const authReducer = (state: IAuthContext, action: IAction) => {
    switch (action.type) {
        case "LOGIN":
            // console.log("action.payload", action.payload)
            localStorage.setItem("user", JSON.stringify({
                isLoggedIn: true,
                accessToken: action?.payload?.accessToken || null,
                refreshToken: action?.payload?.refreshToken || null,
                role: action?.payload?.role || null,
                userType: action?.payload?.userType || null,
            }))
            return {
                isLoggedIn: true,
                accessToken: action?.payload?.accessToken || null,
                refreshToken: action?.payload?.refreshToken || null,
                role: action?.payload?.role || null,
                userType: action?.payload?.userType || null,
            }
        case "LOGOUT":
            localStorage.removeItem("user")
            return {
                isLoggedIn: false,
                accessToken: null,
                refreshToken: null,
                role: null,
                userType: null,
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children} : { children: ReactNode }) => {
    const [state, dispatch] = useReducer<Reducer<IAuthContext, IAction>>(authReducer, initialState)

    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            const user: IAuthContext = JSON.parse(auth)
            dispatch({type: "LOGIN", payload: {
                // isLoggedIn: true,
                accessToken: user?.accessToken,
                refreshToken: user?.refreshToken || null,
                role: user?.role || null,
                userType: user?.userType || null,
            } })
        }
    }, [dispatch])
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}