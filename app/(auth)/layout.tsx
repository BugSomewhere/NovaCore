export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-[500px] rounded-full bg-success/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-10">
        {children}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} NovaCore. All rights reserved.
        </p>
      </div>
    </div>
  );
}
