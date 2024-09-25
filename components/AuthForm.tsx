/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, } from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authformSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

import { useRouter } from 'next/navigation'
import SignUp from '@/app/(auth)/sign-up/page'
import { SignIn } from '@/lib/actions/user.actions'


const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(false);
    
    const formSchema = authformSchema(type);
    //* Define the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    // ? Define a submit handler.
    const onSubmit= async (data: z.infer<typeof formSchema>)=> {
        setloading(true)
        try{
            if(type==='sign-up'){
                const newUser = await SignUp(data);
                setUser(newUser);
            }
            if(type=== 'sign-in'){
                // const response = await SignIn({
                // //     email:data.email,
                // //     password: data.password
                // });
                // if(response){
                //     router.push('/')
                // }
            }
    } catch(error){
        console.error();
    } finally{
        setloading(false)
    }
    }

    return (
        <section className='auth-form'>
            <header className="flex flex-col gap-55 md:gap-8">
                <Link href="/"
                    className='cursor-pointer flex items-center gap-1'>
                    <Image
                        src="/icons/logo.svg" width={34} height={34} alt='Horizon logo'
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                        BanglaVault</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        <p className="text-16 font-normal text-gray-600">
                            {user ? 'Link your account to get started' :
                                'Please enter your credentials'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                </div>
            ) : (

                //? conditionally rendering the sign in/up page
                //* Its better be good
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type=='sign-up' && (
                                <>
                <div className="flex gap-4">
                 <CustomInput
                 control={form.control} name='firstName' label='First Name'
                 placeholder='Enter your First Name' />
                 <CustomInput
                 control={form.control} name='lastName' label='Last Name'
                 placeholder='Enter your Last Name' />
                </div>
                 <CustomInput
                 control={form.control} name='address' label='Address'
                 placeholder='Enter your Address' />

                 <div className="flex gap-4">
                 <CustomInput
                 control={form.control} name='state' label='City'
                 placeholder='Enter your State' />
                 <CustomInput
                 control={form.control} name='postalCode' label='Postal Code'
                 placeholder= "Example '9126' " />
                 </div>
                 <div className="flex gap-4">
                 <CustomInput
                 control={form.control} name='dob' label='DOB'
                 placeholder='dd-mm-yyyy' />
                 <CustomInput
                 control={form.control} name='nid' label='NID'
                 placeholder='Enter 10 digit NID number' />
                 </div>
                 </>
                         )}

                            <CustomInput
                                control={form.control} name='email' label='Email'
                                placeholder='Enter your user Email' />
                            <CustomInput
                                control={form.control} name='password' label='Password'
                                placeholder='Enter your user Password' />
                                <div className="flex flex-col gap-4">
                            <Button type="submit" disabled={loading} className='form-btn' >{loading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                </>
                            ) : type === 'sign-in' ? 'Sing in' : 'Sign Up'
                            }
                            </Button>
                            </div>
                        </form>
                    </Form>
                    
                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
                        </p>
                        <Link href={type == 'sign-in' ? '/sign-up' : "/sign-in"} >
                            {type === 'sign-in' ? "Sign up now" : "Sign in"}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm