import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Boxes } from '../ui/background-boxes';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:5001/api/auth/login',
        values
      );
      // Save the token and user data in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Redirect to the profile page
      navigate('/profile');
    } catch (err: any) {
      console.error('Signin error:', err);
      setError(
        err.response?.data?.error || 'Sign in failed. Please try again.'
      );
    }
  };

  return (
    <div className="bg-black relative overflow-hidden">
      {/* Animated Background Boxes */}
      <Boxes />

      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-8 bg-[rgba(255,255,255,0.15)] 
            shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
            backdrop-blur-[6px] 
            rounded-[10px] 
            border 
            border-[rgba(255,255,255,0.18)] relative z-10 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              <div className="space-y-4 ">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="mail@example.com"
                          {...field}
                          className="border border-gray-300 rounded-md p-2 w-full text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="border border-gray-300 rounded-md p-2 w-full text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
                type="submit"
              >
                Sign in
              </Button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link
                className="text-blue-500 hover:underline"
                to="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignInForm;