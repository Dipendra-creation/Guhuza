'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
import Link from 'next/link';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
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
      router.push('/profile');
    } catch (err: any) {
      console.error('Signin error:', err);
      setError(err.response?.data?.error || 'Sign in failed. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign in
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">
        Don&apos;t have an account?{' '}
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;