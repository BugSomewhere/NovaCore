import { cn } from '@/lib/utils';

function scorePassword(password: string) {
  let score = 0;
  if (!password) return 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];

export function PasswordStrength({ password }: { password: string }) {
  const score = scorePassword(password);
  if (!password) return null;

  const barColor =
    score <= 1
      ? 'bg-destructive'
      : score === 2
        ? 'bg-success'
        : score === 3
          ? 'bg-success'
          : 'bg-primary';

  const labelColor =
    score <= 1 ? 'text-destructive' : score === 4 ? 'text-primary' : 'text-success';

  return (
    <div className="mt-2">
      <div className="flex h-1.5 w-full gap-1">
        {[1, 2, 3, 4].map((segment) => (
          <div
            key={segment}
            className={cn(
              'flex-1 rounded-full transition-all duration-300',
              segment <= score ? barColor : 'bg-muted',
            )}
          />
        ))}
      </div>
      <p className={cn('mt-1.5 text-right text-xs', labelColor)}>
        {LABELS[score]}
      </p>
    </div>
  );
}
