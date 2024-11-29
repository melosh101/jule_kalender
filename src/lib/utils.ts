import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDaysUntilChristmas(): number {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25); // Month is 0-indexed
  
  if (today > christmas) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }
  
  const timeDiff = christmas.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
      new Promise((resolve) => {
          if (timer) {
              clearTimeout(timer);
          }

          timer = setTimeout(() => {
              resolve(fn(args));
          }, ms);
      });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}

