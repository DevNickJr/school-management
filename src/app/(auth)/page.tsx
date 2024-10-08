'use client'
import Link from 'next/link'
import React, { useReducer, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { IUserLogin, ILoginReducerAction, IUserLoginResponse, AccountTypeEnum } from '@/interfaces'
import { useRouter } from 'next/navigation'
import useMutate from '@/hooks/useMutate'
import { apiLogin } from '@/services/AuthService'
import Loader from '@/components/Loader'
import { useAuthContext } from '@/hooks/useAuthContext'
import { MdRemoveRedEye } from 'react-icons/md'
import { EyeIcon, EyeOff } from 'lucide-react'

const initialState: IUserLogin = {
  email: '',
  password: ''
}


const Login = () => {
  const [user, userDispatch] = useReducer((state: IUserLogin, action: ILoginReducerAction) => {
    return { ...state, [action.type]: action.payload }
  }, initialState)
  const { dispatch } = useAuthContext()
  const [show, setShow] = useState(false)
  const router = useRouter()

  const loginMutation = useMutate<IUserLogin, any>(
    apiLogin,
    {
      onSuccess: (data: IUserLoginResponse) => {
        dispatch({ type: "LOGIN", payload: data })
        toast.success("Logged in Successfully")
        if (data.role === AccountTypeEnum.teacher) {
          return router.push('/teachers')
        }
        return router.push('/dashboard')
      },
      showErrorMessage: true,
    }
  )


  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    loginMutation.mutate(user)
  }

  return (
    <div className='pt-12 md:pl-24'>
      {loginMutation?.isPending && <Loader />}
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Welcome Back!</h1>
          <p className='text-sm'>Welcome Back! Please Enter your details</p>
      </div>
      <form onSubmit={handleLogin} action="" className="max-w-l">
        <div className='grid gap-10 mb-2'>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="name">Email Address</label>
              <input  value={user?.email} onChange={(e) => userDispatch({ type: "email", payload: e.target.value})} type="text" name="name" id="name" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Email Address' />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="name">Password</label>
              <div className='relative flex flex-col'>
                <input  value={user?.password} onChange={(e) => userDispatch({ type: "password", payload: e.target.value})} type={show ? "text" : 'password'} name="password" id="password" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Password' />
                {show && <EyeIcon onClick={() => setShow(prev => !prev)} className='absolute h-4 md:h-5 w-10 top-1/2 z-10 -translate-y-1/2 right-2 cursor-pointer' />}
                {!show && <EyeOff onClick={() => setShow(prev => !prev)} className='absolute h-4 md:h-5 w-10 top-1/2 z-10 -translate-y-1/2 right-2 cursor-pointer' />}
              </div>
            </div>
        </div>
        <Link href='/forgot-password' className='my-2 text-sm font-semibold text-primary'>
            Forgot Password?
        </Link>
        <button type='submit' className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-12 text-sm font-bold text-white rounded-md bg-primary'>
            Sign In
        </button>
        <p className='mt-3 text-sm text-center'>Don&apos;t have an account? <Link href='/register' className='text-primary'>Sign Up</Link></p>

      </form>
    </div>
  )
}

export default Login