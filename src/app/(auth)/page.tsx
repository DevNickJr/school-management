'use client'
import Link from 'next/link'
import React, { useReducer, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { IUserLogin, ILoginReducerAction } from '@/interfaces'
import { useRouter } from 'next/navigation'
import useMutate from '@/hooks/useMutate'
import { apiLogin } from '@/services/AuthService'
import Loader from '@/components/Loader'

const initialState: IUserLogin = {
  email: '',
  password: ''
}


const Login = () => {
  const [loading, setLoading] = React.useState(false)
  const [user, dispatch] = useReducer((state: IUserLogin, action: ILoginReducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)

const { mutate } = useMutate<IUserLogin, any>(
  apiLogin,
  {
    onSuccess: () => {
        toast.success("Logged in Successfully")
        router.push('/dashboard')
    },
    onError: (error: any) => {
      console.log({error})
        toast.error(error?.message || "An error occured")
    }
  }
)


  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
    
    } catch (error: any) {
        console.log("error", error)
        toast.error(error?.message)
    }
    setLoading(false)
}

  return (
    <div className='pt-12 md:pl-24'>
      {loading && <Loader />}
      <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className='text-2xl font-bold'>Welcome Back!</h1>
          <p className='text-sm'>Welcome Back! Please Enter your details</p>
      </div>
      <form onSubmit={handleLogin} action="" className="max-w-l">
        <div className='grid gap-10 mb-2'>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="name">Email Address</label>
              <input  value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})} type="text" name="name" id="name" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Email Address' />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="name">Password</label>
              <input  value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} type="text" name="password" id="password" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Password' />
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