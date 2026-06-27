'use client';
import {useForm, useFormState} from 'react-hook-form';

const login = () => {

	

	return (
		<>
		<h1 className='form-title'>
			Welcome back! Please sign in to your account.
		</h1>
			<form onSubmit={} className='space-y-5'>
				<button
					type='submit'
					disabled={isSubmitting}
					className='yellow-btn w-full mt-5'>
					{isSubmitting ? 'Signing In...' : 'Sign In'}
				</button>
			</form>
		</>
	)
};

export default login;
