import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { QueryProvider } from '@/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const baseUrl = process.env.BASE_URL

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
  title: 'NovaCore — Quản lý dự án thông minh',
  description:
    'Nền tảng quản lý dự án thế hệ mới giúp đội ngũ phối hợp hiệu quả, theo dõi tiến độ real-time.',
  keywords: ['NovaCore', 'Quản lý dự án', 'Dự án', 'Quản lý công việc', 'Quản lý', 'Phối hợp'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'NovaCore — Quản lý dự án thông minh',
    description:
      'Nền tảng quản lý dự án thế hệ mới giúp đội ngũ phối hợp hiệu quả, theo dõi tiến độ real-time.',
    url: baseUrl,
    siteName: 'NovaCore',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'NovaCore',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
    countryName: 'Vietnam'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
