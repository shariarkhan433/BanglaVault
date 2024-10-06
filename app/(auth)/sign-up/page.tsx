import AuthForm from '@/components/AuthForm'
import React from 'react'

export const SignUp = (data?: { email: string; password: string; firstName?: string | undefined; lastName?: string | undefined; address?: string | undefined; state?: string | undefined; postalCode?: string | undefined; dob?: string | undefined; nid?: string | undefined }) => {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type='sign-up' />
      </section>
  )
}
export default SignUp
