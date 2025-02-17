'use client';

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

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    image: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const SignUpForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setError('');
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('firstName', values.firstName || '');
      formData.append('lastName', values.lastName || '');
      formData.append('email', values.email);
      formData.append('password', values.password);

      // If an image file is selected, append it
      if (values.image && values.image[0]) {
        formData.append('image', values.image[0]);
      }

      const response = await axios.post(
        'http://localhost:5001/api/auth/signup',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Save token and user data in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to the profile page
      navigate('/profile');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background Boxes with hover events enabled */}
      <Boxes />

      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-8 bg-[rgba(255,255,255,0.15)] 
            shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
            backdrop-blur-[6px] 
            rounded-[10px] 
            border 
            border-[rgba(255,255,255,0.18)] ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe"
                          {...field}
                          className="border border-gray-300 rounded-md p-2 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          className="border border-gray-300 rounded-md p-2 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          className="border border-gray-300 rounded-md p-2 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          className="border border-gray-300 rounded-md p-2 w-full"
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
                          className="border border-gray-300 rounded-md p-2 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Re-Enter your password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-Enter your password"
                          {...field}
                          className="border border-gray-300 rounded-md p-2 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Upload Profile Image</FormLabel>
                      <FormControl className='text-white'>
                        <Input
                          type="file"
                          onChange={(e) => field.onChange(e.target.files)}
                          className="w-full text-gray-200"
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
                Sign up
              </Button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <Link className="text-blue-500 hover:underline" to="/sign-in">
                Sign in
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;