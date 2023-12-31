'use client'

import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Heading from '@/ui/Heading'
import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'

import { IEmailPassword } from '@/store/user/user.interface'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { useAuthRedirect } from './useAuthRedirect'
import { validEmail, validPhone } from './validation'

const Auth: FC = () => {
	useAuthRedirect()

	const { login, register } = useActions()

	const [type, setType] = useState<'login' | 'register'>('login')
	const [authError, setAuthError] = useState('')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IEmailPassword> = async data => {
		if (type === 'login') {
			const response: any = await login(data)
			setAuthError(response.payload)
		} else if (type === 'register') {
			const response: any = await register(data)
			console.log(response)
			setAuthError(response.payload)
		}
		reset()
	}

	return (
		<section className='flex h-screen'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='rounded-lg bg-white shadow-sm p-8 m-auto'
			>
				<Heading className='capitalize text-center mb-4'>{type}</Heading>
				<Field
					{...formRegister('email', {
						required: 'Email is required',
						pattern: {
							value: validEmail,
							message: 'Please enter a valid email addres'
						}
					})}
					placeholder='Email'
					type='text'
					error={errors.email?.message}
				/>
				{type === 'register' ? (
					<>
						<Field
							{...formRegister('name', {
								minLength: {
									value: 1,
									message: 'Min length should more 6 symbols'
								}
							})}
							type='text'
							placeholder='Name'
							error={errors.name?.message}
						/>
						<Field
							{...formRegister('phone', {
								required: 'Phone is required',
								pattern: {
									value: validPhone,
									message: 'Please enter a valid phone'
								}
							})}
							type='text'
							placeholder='Phone'
							error={errors.phone?.message}
						/>
					</>
				) : null}
				<Field
					{...formRegister('password', {
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Min length should more 6 symbols'
						}
					})}
					type='password'
					placeholder='Password'
					error={errors.password?.message}
				/>
				<div className='flex flex-center text-red'>{authError}</div>
				<Button className='mt-5 ml-10' type='submit' variant='orange'>
					Let's go!
				</Button>
				<div>
					<button
						type='button'
						className='inline-block opacity-20 mt-5 ml-20 text-sm'
						onClick={() => {
							setType(type === 'login' ? 'register' : 'login'), setAuthError('')
						}}
					>
						{type === 'login' ? 'Register' : 'Login'}
					</button>
				</div>
			</form>
		</section>
	)
}

export default Auth
