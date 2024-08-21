"use client"
import { AccountTypeEnum } from "@/interfaces";
import { ReactNode, Reducer, createContext, useEffect, useReducer } from "react";

export interface IAuthContext {
    name: string | null;
    email: string | null; 
    account: string | null; 
    isLoggedIn: boolean;
    role: AccountTypeEnum | null;
    academicYear: string | null
    accessToken: string | null
    refreshToken: string | null
}

let user = null

if (typeof window !== "undefined" && localStorage) {
    user = localStorage.getItem("user") 
}

const initialState: IAuthContext = user ? JSON.parse(user) : {
    name: null,
    email: null, 
    account: null, 
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
    name: null,
    email: null, 
    account: null, 
    isLoggedIn: false,
    academicYear: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    dispatch: (): void => {}
}

export const AuthContext = createContext<IAuthContextProvider>(initAuthContext)



export const authReducer = (state: IAuthContext, action: IAction) => {
    switch (action.type) {
        case "LOGIN":
            const authUser = {
                isLoggedIn: true,
                accessToken: action?.payload?.accessToken || null,
                academicYear: action?.payload?.academicYear || null,
                refreshToken: action?.payload?.refreshToken || null,
                role: action?.payload?.role || null,
                name: action?.payload?.name || null,
                email: action?.payload?.email || null,
                account: action?.payload?.account || null,
            }
            localStorage.setItem("user", JSON.stringify(authUser))
            return authUser
        case "LOGOUT":
            localStorage.removeItem("user")
            return initialState;
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
            dispatch({type: "LOGIN", payload: user })
        }
    }, [dispatch])
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}