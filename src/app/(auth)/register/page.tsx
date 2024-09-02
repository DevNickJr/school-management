'use client'
import Link from 'next/link'
import React, { useReducer, FormEvent, useState } from 'react'
import { IUserRegister, IRegistereducerAction, TermEnum } from '@/interfaces'
import { toast } from 'react-toastify'
import usePost from '@/hooks/useMutate'
import { useRouter } from 'next/navigation'
import { apiRegister } from '@/services/AuthService'
import Loader from '@/components/Loader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EyeIcon, EyeOff } from 'lucide-react'


const initialState: IUserRegister = {
  name: '',        
  email: '',
  password: '', 
  confirm_password: '',
  phone: '',
  schoolName: '',
  session: '',
  term: '',
}

const Register = () => {
  const [step, setStep] = React.useState<number>(1)
  const [loading, setLoading] = React.useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const [user, dispatch] = useReducer((state: IUserRegister, action: IRegistereducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)

const router = useRouter()

const registerMutation = usePost<IUserRegister, any>(
    apiRegister,
    {
      onSuccess: () => {
          toast.success('Success')
          localStorage.setItem('email', user.email)
          router.push('/', {
      })
      },
      onError: (error: any) => {
        console.log({error})
        toast.error(error?.response?.data?.errors?.message || "An error occured")
      }
    }
  )

  const handleNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }
  }


const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault()
  if (user?.password !== user?.confirm_password) {
      toast.error("Password Mismatch")
      return
  }
  if (user?.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
  }
  if (user?.phone.length < 11) {
      toast.error("Phone number must be at least 11 characters")
      return
  }
  registerMutation?.mutate(user)
}


  return (
    <div className='pt-12 md:pl-24'>
      {registerMutation?.isPending && <Loader />}
      <div className="flex flex-col items-center gap-4 mb-8">
          <h1 className='text-2xl font-bold'>Create an Account</h1>
          <p className='text-sm'>Create an account to Get Started</p>
      </div>
      <div className="">
        <div className='mb-2'>
          {step === 1 && (
            <form className='grid gap-4' onSubmit={handleNext}>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="name">Name</label>
                <input required value={user?.name} onChange={(e) => dispatch({ type: "name", payload: e.target.value})} type='text' name="name" id="name" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter First Name' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="password">School Name</label>
                <input required value={user?.schoolName} onChange={(e) => dispatch({ type: "schoolName", payload: e.target.value})}  type="schoolName" name="schoolName" id="schoolName" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter School Name' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="session">Current Session</label>
                <input required value={user?.session} onChange={(e) => dispatch({ type: "session", payload: e.target.value})}  type="text" name="session" id="session" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Session, eg 2021/2022' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="term">Current Term</label>
                <Select onValueChange={(value) => dispatch({ type: "term", payload: value })}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Object.values(TermEnum)?.map(term => (
                        <SelectItem key={term} value={term}>{term}</SelectItem> 
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>

          
              <button type='submit' className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-8 text-sm font-bold text-white rounded-md bg-primary'>
                Proceed
              </button>
            </form>
          )}
          {step === 2 && (
            <form className='grid gap-4' onSubmit={handleRegister}>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="email">Email Address</label>
                <input required value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})}  type="email" name="email" id="email" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Email Address' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="phone">Phone Number</label>
                <input required value={user?.phone} onChange={(e) => dispatch({ type: "phone", payload: e.target.value})}  type="tel" name="phone" id="phone" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Phone number' />
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="password">Password</label>
                <div className='relative flex flex-col'>
                  <input required value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} type={showPassword1 ? "text" : 'password'} name="password" id="password" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Password' />
                  {showPassword1 && <EyeIcon onClick={() => setShowPassword1(prev => !prev)} className='absolute h-4 md:h-5 w-10 top-1/2 z-10 -translate-y-1/2 right-2 cursor-pointer' />}
                  {!showPassword1 && <EyeOff onClick={() => setShowPassword1(prev => !prev)} className='absolute h-4 md:h-5 w-10 top-1/2 z-10 -translate-y-1/2 right-2 cursor-pointer' />}
                </div>
              </div>
              <div className='flex flex-col gap-2 text-xs'>
                <label htmlFor="confirm_password">Confirm Password</label>
                <div className='relative flex flex-col'>
                  <input required value={user?.confirm_password} onChange={(e) => dispatch({ type: "confirm_password", payload: e.target.value})} type={showPassword2 ? "text" : 'password'} name="confirm_password" id="confirm_password" className='p-3 border rounded-md placeholder:text-sm' placeholder='Confrim Password' />
                  {showPassword2 && <EyeIcon onClick={() => setShowPassword2(prev => !prev)} className='absolute h-4 md:h-5 w-10 top-1/2 z-10 -translate-y-1/2 right-2 cursor-pointer' />}
                  {!showPassword2 && <EyeOff onClick={() => setShowPassword2(prev => !prev)} className='absolute h-4 md:h-5 w-10 top-1/2 z-10 -translate-y-1/2 right-2 cursor-pointer' />}
                </div>
              </div>
              <button type='submit' className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-8 text-sm font-bold text-white rounded-md bg-primary'>
                Proceed
              </button>
            </form>
          )}
        </div>
        <p className='mt-3 text-sm text-center'>Already have an account? <Link href='/' className='text-primary'>Sign In</Link></p>
        
      </div>
    </div>
  )
}

export default Register