import { cn } from '@/lib/utils';

const STEPS = ['Account Info', 'Organization', 'Verify'];

export function RegisterStepper({ current = 1 }: { current?: number }) {
  // progress fill between first and last step center
  const progress = ((current - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="relative mb-14 flex items-center justify-between">
      {/* Track */}
      <div className="absolute left-0 top-1/2 z-0 h-1 w-full -translate-y-1/2 rounded-full bg-muted" />
      {/* Progress */}
      <div
        className="absolute left-0 top-1/2 z-0 h-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-500"
        style={{ width: `${progress}%` }}
      />

      {STEPS.map((label, index) => {
        const step = index + 1;
        const isActive = step === current;
        const isComplete = step < current;
        return (
          <div
            key={label}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className={cn(
                'flex size-8 items-center justify-center rounded-full text-xs font-medium transition-colors',
                isActive &&
                  'bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20',
                isComplete && 'bg-primary text-primary-foreground',
                !isActive &&
                  !isComplete &&
                  'border border-border bg-muted text-muted-foreground',
              )}
            >
              {step}
            </div>
            <span
              className={cn(
                'absolute -bottom-7 whitespace-nowrap text-xs',
                isActive
                  ? 'font-semibold text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
