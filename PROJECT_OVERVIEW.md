# Tổng Quan Dự Án: NovaCore

Tài liệu này cung cấp cái nhìn tổng quan về kiến trúc, cấu trúc thư mục và các công nghệ cốt lõi được sử dụng trong dự án NovaCore. Tài liệu được biên soạn nhằm giúp các nhà phát triển mới dễ dàng tiếp cận và hiểu rõ cách hệ thống hoạt động.

## 1. Giới Thiệu
**NovaCore** là một ứng dụng Web Full-stack hiện đại, được xây dựng dựa trên hệ sinh thái **React** và **Next.js**. Ứng dụng tích hợp sẵn hệ thống xác thực (Authentication), giao diện người dùng (UI) mạnh mẽ, và khả năng tương tác dữ liệu linh hoạt, an toàn.

## 2. Công Nghệ Sử Dụng (Tech Stack)

Dự án áp dụng các công nghệ tiên tiến nhất hiện nay để đảm bảo hiệu suất, tính bảo mật và khả năng mở rộng:

### 2.1. Frontend & Giao Diện
- **Framework Chính:** [Next.js 16.2](https://nextjs.org/) sử dụng **App Router** kết hợp với **React 19**.
- **Ngôn ngữ:** TypeScript để đảm bảo an toàn kiểu dữ liệu (Type-safety).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) cho phép viết CSS nhanh chóng qua các utility classes. Có sử dụng plugin `tw-animate-css` cho các hiệu ứng chuyển động.
- **Thư Viện UI:**
  - [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/): Xây dựng các component UI dễ tùy biến, hỗ trợ trợ năng (accessibility) cao.
  - **Lucide React:** Thư viện biểu tượng (icons) hiện đại và nhẹ nhàng.
  - **Sonner:** Quản lý và hiển thị thông báo (Toast notifications) cho người dùng.

### 2.2. Quản Lý Trạng Thái & Dữ Liệu (State & Data Fetching)
- **Data Fetching:** [TanStack Query (React Query v5)](https://tanstack.com/query/latest) kết hợp với **Axios** để xử lý gọi API, cache dữ liệu, và đồng bộ trạng thái server với client một cách tối ưu.
- **Xử Lý Form:** [React Hook Form](https://react-hook-form.com/) giúp quản lý state của form nhẹ nhàng, hiệu năng cao.
- **Validation:** [Zod](https://zod.dev/) được dùng để xác thực dữ liệu (schema validation) ở cả Frontend và Backend.

### 2.3. Backend, Database & Xác Thực (Authentication)
- **Backend API:** Sử dụng Next.js API Routes (thư mục `app/api/`) để xử lý các logic ở phía máy chủ.
- **Cơ Sở Dữ Liệu:** [PostgreSQL](https://www.postgresql.org/) kết nối trực tiếp thông qua thư viện `pg` với mô hình Connection Pool (`lib/db.ts`).
- **Xác Thực (Auth):**
  - **JWT (JSON Web Tokens):** Quản lý phiên đăng nhập sử dụng thư viện `jose` để mã hóa và giải mã token (`lib/auth.ts`).
  - **Mật Khẩu:** Sử dụng `bcryptjs` để băm (hashing) và kiểm tra mật khẩu an toàn.
  - **Bảo mật Session:** Lưu trữ JWT trong **HTTP-only Cookies**, giúp giảm thiểu rủi ro tấn công XSS.

---

## 3. Cấu Trúc Thư Mục

Cấu trúc dự án được tổ chức theo chuẩn Next.js App Router, phân chia rõ ràng giữa giao diện, logic và cấu hình:

```text
c:\NovaCore
├── app/                  # Trái tim của Next.js (App Router)
│   ├── (auth)/           # Các trang liên quan đến đăng nhập, đăng ký (Route Group)
│   ├── (dashboard)/      # Bảng điều khiển chính sau khi đăng nhập
│   ├── (root)/           # Các trang landing page / trang chủ ngoài cùng
│   ├── api/              # Định nghĩa các endpoint RESTful API của ứng dụng
│   ├── globals.css       # File CSS toàn cục (chứa các biến của Tailwind/shadcn)
│   └── layout.tsx        # Layout gốc bao bọc toàn bộ ứng dụng
├── components/           # Chứa các UI Components dùng chung (ví dụ: Button, Input)
├── constants/            # Chứa các hằng số, thông tin cấu hình tĩnh
├── hooks/                # Custom React Hooks (vd: hook xử lý logic UI dùng chung)
├── lib/                  # Mã nguồn tiện ích, cấu hình core
│   ├── auth.ts           # Logic tạo, xác thực JWT và quản lý Cookies
│   ├── db.ts             # Cấu hình kết nối PostgreSQL (Connection Pool)
│   ├── utils.ts          # Các hàm helper (vd: merge Tailwind classes với clsx)
│   └── validations/      # Định nghĩa Zod schemas để validate dữ liệu
├── providers/            # React Context Providers (vd: ThemeProvider, QueryClientProvider)
├── scripts/              # Các kịch bản chạy ngoài ứng dụng (vd: migrate DB, seed data)
├── services/             # Lớp trung gian gọi API (sử dụng Axios) phục vụ cho Frontend
├── stores/               # Quản lý State toàn cục phía client (vd: Zustand hoặc Redux, nếu có)
├── types/                # Định nghĩa các TypeScript Interfaces / Types dùng chung toàn dự án
├── package.json          # Danh sách thư viện và scripts hệ thống (dev, build, start, lint)
└── next.config.ts        # Cấu hình core của Next.js
```

## 4. Luồng Hoạt Động Điển Hình (Ví dụ: Authentication)

1. **Người dùng đăng nhập:** Client gửi thông tin tài khoản qua form (được quản lý bởi `react-hook-form` & `zod`) lên API Route (`app/api/auth/login`).
2. **Xử lý Backend:** Next.js API nhận request, truy vấn DB PostgreSQL (`lib/db.ts`) để lấy thông tin. `bcryptjs` sẽ so khớp mật khẩu.
3. **Tạo Session:** Nếu đúng, hệ thống dùng `jose` tạo ra JWT (`lib/auth.ts`) và gán nó vào **HTTP-only cookie**.
4. **Truy cập trang bảo vệ:** Các trang trong `(dashboard)` có thể đọc cookie thông qua Next.js Server Components, dùng `verifyToken` để kiểm tra quyền truy cập trước khi render dữ liệu.

## 5. Hướng Dẫn Phát Triển

Để bắt đầu làm việc với dự án trên môi trường Local:
1. Đảm bảo đã cài đặt Node.js và pnpm. Chạy `pnpm install` để cài thư viện.
2. Cấu hình biến môi trường trong file `.env.local` (như `DATABASE_URL`, `JWT_SECRET`).
3. Khởi chạy ứng dụng: `pnpm run dev`.
4. Truy cập `http://localhost:3000` để xem kết quả.
