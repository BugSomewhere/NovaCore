'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import type { LoginInput, RegisterInput } from '@/lib/validations/auth';
import type { AuthUser } from '@/types';

export function useCurrentUser() {
  return useQuery<AuthUser>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      try {
        const { data } = await axios.get('/api/auth/me');
        return data.user;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const { data } = await axios.post('/api/auth/login', input);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data.user);
      router.push('/');
      router.refresh();
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const { data } = await axios.post('/api/auth/register', input);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data.user);
      router.push('/');
      router.refresh();
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await axios.post('/api/auth/logout');
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], null);
      queryClient.clear();
      router.push('/login');
      router.refresh();
    },
  });
}
