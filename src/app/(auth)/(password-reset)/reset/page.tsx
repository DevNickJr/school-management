'use client'
import usePost from '@/hooks/useMutate'
import { IChangePassword, IReducerAction } from '@/interfaces'
import { apiChangePassword } from '@/services/AuthService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { toast } from 'react-toastify'


const initialState: IChangePassword = {
  password: '',
  confirm_password: '',
  token: 'hjasdhikuoisa',
  uidb64: 'MTI',
}

export interface IChangePasswordReducerAction extends IReducerAction<"password" | "confirm_password" | "token"> {
  payload: string
}

const ResetPassword = () => {
  const [loading, setLoading] = React.useState(false)
  const [user, dispatch] = React.useReducer((state: IChangePassword, action: IChangePasswordReducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)
const router = useRouter()

const forgotPasswordMutation = usePost<IChangePassword, any>(apiChangePassword, {
  onSuccess: () => {
    toast.success("Password Reset Link Sent")
    router.push('/reset')
  }
})

const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault()
  forgotPasswordMutation.mutate(user)
}
  return (
    <div className='pt-12 md:pl-24'>
      <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                <AiOutlineArrowLeft className='w-8 h-8 text-primary' />
            </div>
          <h1 className='text-2xl font-bold'>Set New Password</h1>
          <p className='text-sm'>Enter a new password that only you can figure out</p>
      </div>
      <form onSubmit={handleForgotPassword} action="" className="max-w-l">
        <div className='grid gap-10 mb-2'>
            <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="password">New Password</label>
                <input type="text" name="password" id="password" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter New Password'  value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="confirm_password">Confirm confirm_Password</label>
                <input type="text" name="confirm_password" id="password" className='p-3 border rounded-md placeholder:text-sm' placeholder='Confirm New Password' value={user?.confirm_password} onChange={(e) => dispatch({ type: "confirm_password", payload: e.target.value})} />
            </div>
        </div>
        <button type='submit' className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-12 mb-4 text-sm font-bold text-white rounded-md bg-primary'>
          Reset Password
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

export default ResetPassword