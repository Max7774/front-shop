import cn from 'clsx'
import { forwardRef, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

import { IField } from './field.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ placeholder, error, className, type = 'text', style, Icon, ...rest },
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false)

		const toggleShowPassword = () => {
			setShowPassword(prevState => !prevState)
		}
		return (
			<div className={cn('mb-4', className)} style={style}>
				<label>
					<span className='mb-1 block'>
						{Icon && <Icon className='mr-3' />}
						{placeholder}
					</span>
					<div className='relative'>
						<input
							ref={ref}
							type={showPassword ? 'text' : type}
							placeholder={placeholder}
							className={cn(
								'px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all placeholder:text-gray rounded-lg',
								{
									'border-red': !!error
								}
							)}
							{...rest}
						/>
						{type === 'password' && (
							<button
								type='button'
								className='absolute top-1/2 bg-white right-3 transform -translate-y-1/2'
								onClick={toggleShowPassword}
							>
								{showPassword ? <IoMdEyeOff /> : <IoMdEye />}
							</button>
						)}
					</div>
				</label>
				{error && <div className='text-red mt-1 text-sm'>{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
