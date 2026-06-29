'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRegister } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RegisterStepper } from '@/components/auth/register-stepper';
import { PasswordStrength } from '@/components/auth/password-strength';
import { Mail, Lock, User, ArrowRight, Loader2, Database, Check } from 'lucide-react';
import type { RegisterInput } from '@/lib/validations/auth';

type RegisterFormValues = RegisterInput & { acceptTerms: boolean };

export default function RegisterPage() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const passwordValue = watch('password') ?? '';

  const onSubmit = ({ acceptTerms: _acceptTerms, ...data }: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <Card className="overflow-hidden border-border/60 p-0 shadow-2xl shadow-black/10">
      {/* Header */}
      <div className="border-b border-border/60 bg-muted/30 px-8 pb-6 pt-10 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Database className="size-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">NovaCore</h1>
        </div>
        <p className="text-sm text-muted-foreground">Request Early Access</p>
      </div>

      <CardContent className="px-8 pb-10 pt-8">
        <RegisterStepper current={1} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="Jane Doe"
                className="pl-10"
                {...register('fullName', {
                  required: 'Please enter your full name',
                  minLength: { value: 2, message: 'At least 2 characters' },
                })}
                aria-invalid={!!errors.fullName}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          {/* Work Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Work Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="jane@company.com"
                className="pl-10"
                {...register('email', { required: 'Please enter your work email' })}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                {...register('password', {
                  required: 'Please enter a password',
                  minLength: { value: 6, message: 'At least 6 characters' },
                })}
                aria-invalid={!!errors.password}
              />
            </div>
            <PasswordStrength password={passwordValue} />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val) =>
                    val === watch('password') || 'Passwords do not match',
                })}
                aria-invalid={!!errors.confirmPassword}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="pt-1">
            <label className="group flex cursor-pointer items-start gap-3">
              <span className="relative mt-0.5 flex items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  {...register('acceptTerms', {
                    required: 'You must accept the terms to continue',
                  })}
                />
                <span className="flex size-5 items-center justify-center rounded border-2 border-border bg-background transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40">
                  <Check className="size-3 text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100" />
                </span>
              </span>
              <span className="text-sm leading-tight text-muted-foreground">
                I agree to the{' '}
                <Link
                  href="#"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="#"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-xs text-destructive">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          {registerMutation.isError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2">
              <p className="text-sm text-destructive">
                {(
                  registerMutation.error as Error & {
                    response?: { data?: { message?: string } };
                  }
                )?.response?.data?.message ?? 'Registration failed'}
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
