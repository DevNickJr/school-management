'use client'
import appConfig from '@/configs/app.config'
import usePost from '@/hooks/useMutate'
import { IForgotPassword, IReducerAction } from '@/interfaces'
import { apiForgotPassword } from '@/services/AuthService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { toast } from 'react-toastify'

const initialState: IForgotPassword = {
  email: '',
  redirect_url: appConfig.domain + '/reset'
}

export interface IForgotPasswordReducerAction extends IReducerAction<"email"> {
  payload: string
}

const ForgotPassword = () => {
  const [loading, setLoading] = React.useState(false)
  const [user, dispatch] = React.useReducer((state: IForgotPassword, action: IForgotPasswordReducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)
const router = useRouter()

const forgotPasswordMutation = usePost<IForgotPassword, any>(apiForgotPassword, {
  onSuccess: () => {
    toast.success("Password Reset Link Sent")
    router.push('/reset')
  }
})

const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault()
  forgotPasswordMutation.mutate(user)
}

  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  return (
    <div className='md:pl-24'>
      <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                <AiOutlineArrowLeft className='w-8 h-8 text-primary' />
            </div>
          <h1 className='text-2xl font-bold'>Forgot Password?</h1>
          <p className='text-sm'>Enter your registered Email Address below to receive instructions</p>
      </div>
      <form onSubmit={handleForgotPassword} action="" className="max-w-l">
        <div className='grid gap-10 mb-2'>
            <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="name">Email Address</label>
                <input type="text" name="name" id="name" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Email Address' value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})}  />
            </div>
        </div>
        <button type='submit' className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-12 mb-4 text-sm font-bold text-white rounded-md bg-primary'>
            Continue
        </button>
        <div className='flex items-center justify-center gap-2'>
            <AiOutlineArrowLeft className='' />
            <Link href='/' className='my-2 text-sm font-semibold'>
                Back to Login
            </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword