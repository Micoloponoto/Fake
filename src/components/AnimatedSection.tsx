import type { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../lib/utils';

type AnimationVariant =
  | 'fade-in-up'
  | 'fade-in-down'
  | 'fade-in-left'
  | 'fade-in-right'
  | 'fade-in'
  | 'scale-in';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationVariant;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

const preStateMap: Record<AnimationVariant, string> = {
  'fade-in-up': 'opacity-0 translate-y-6',
  'fade-in-down': 'opacity-0 -translate-y-6',
  'fade-in-left': 'opacity-0 -translate-x-6',
  'fade-in-right': 'opacity-0 translate-x-6',
  'fade-in': 'opacity-0',
  'scale-in': 'opacity-0 scale-95',
};

function AnimatedSection({
  children,
  className,
  animation = 'fade-in-up',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -40px',
}: AnimatedSectionProps) {
  const [ref, isVisible] = useIntersectionObserver({ threshold, rootMargin });

  const style = delay > 0 && isVisible ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
        isVisible ? `animate-${animation}` : preStateMap[animation],
        className
      )}
    >
      {children}
    </div>
  );
}

export default AnimatedSection;
