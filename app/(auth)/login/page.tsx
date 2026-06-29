'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, ArrowRight, Loader2, Database } from 'lucide-react';
import type { LoginInput } from '@/lib/validations/auth';

export default function LoginPage() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit = (data: LoginInput) => {
    login.mutate(data);
  };

  return (
    <Card className="border-border/60 shadow-2xl shadow-black/10">
      <CardHeader className="space-y-1 text-center">
        <Link
          href="/"
          className="mb-2 flex items-center justify-center gap-2"
        >
          <Database className="size-7 text-primary" />
          <span className="text-2xl font-bold tracking-tight">NovaCore</span>
        </Link>
        <CardTitle className="text-xl font-semibold tracking-tight">
          Đăng nhập
        </CardTitle>
        <CardDescription>
          Nhập thông tin tài khoản để tiếp tục
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                {...register('email', { required: 'Vui lòng nhập email' })}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                {...register('password', {
                  required: 'Vui lòng nhập mật khẩu',
                  minLength: { value: 6, message: 'Tối thiểu 6 ký tự' },
                })}
                aria-invalid={!!errors.password}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {login.isError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2">
              <p className="text-sm text-destructive">
                {(login.error as Error & { response?: { data?: { message?: string } } })
                  ?.response?.data?.message ?? 'Đăng nhập thất bại'}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={login.isPending}
          >
            {login.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Đang đăng nhập...
              </>
            ) : (
              <>
                Đăng nhập
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </form>

        <Separator className="my-6" />

        <p className="text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <Link
            href="/register"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
