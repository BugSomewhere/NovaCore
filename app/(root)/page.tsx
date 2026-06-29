'use client';

import { useCurrentUser } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Sparkles,
  Users,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Tốc độ vượt trội',
    description: 'Quản lý dự án nhanh chóng với giao diện tối ưu, phản hồi tức thì.',
  },
  {
    icon: Shield,
    title: 'Bảo mật cao',
    description: 'Xác thực cookie httpOnly, mã hóa JWT, bảo vệ dữ liệu toàn diện.',
  },
  {
    icon: BarChart3,
    title: 'Theo dõi tiến độ',
    description: 'Dashboard trực quan giúp nắm bắt toàn cảnh dự án chỉ trong vài giây.',
  },
  {
    icon: Users,
    title: 'Cộng tác nhóm',
    description: 'Phân quyền linh hoạt, quản lý thành viên và vai trò dễ dàng.',
  },
  {
    icon: Globe,
    title: 'Truy cập mọi nơi',
    description: 'Responsive trên mọi thiết bị, làm việc từ bất kỳ đâu.',
  },
  {
    icon: Sparkles,
    title: 'AI hỗ trợ',
    description: 'Tích hợp AI giúp tự động hóa tác vụ và đề xuất thông minh.',
  },
];

export default function LandingPage() {
  const { data: user } = useCurrentUser();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/[0.03] blur-3xl" />
          <div className="absolute -bottom-24 right-0 size-[400px] rounded-full bg-primary/[0.05] blur-3xl" />
        </div>

        <div className="container relative z-10 flex flex-col items-center gap-8 py-24 text-center md:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            <span>Nền tảng quản lý dự án thế hệ mới</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Quản lý dự án{' '}
            <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              thông minh hơn
            </span>
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            NovaCore giúp đội ngũ của bạn phối hợp hiệu quả, theo dõi tiến độ
            real-time và đạt mục tiêu nhanh chóng.
          </p>

          <div className="flex items-center gap-3">
            {user ? (
              <Button size="lg" asChild>
                <Link href="/">
                  Vào Dashboard
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/register">
                    Bắt đầu miễn phí
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Đăng nhập</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Mọi thứ bạn cần
          </h2>
          <p className="mt-3 text-muted-foreground">
            Bộ công cụ toàn diện để quản lý dự án từ ý tưởng đến hoàn thành.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mb-1.5 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40">
        <div className="container py-20 text-center md:py-28">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tham gia cùng hàng ngàn đội ngũ đang sử dụng NovaCore.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/register">
                Tạo tài khoản miễn phí
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container flex flex-col items-center gap-2 py-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-sm font-medium">NovaCore</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} NovaCore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
