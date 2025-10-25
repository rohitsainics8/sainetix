// Fix: Updated component to support ref forwarding using forwardRef and useImperativeHandle.
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(({ children, className = '', delay = 'delay-200' }, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  // This lets the parent component get a ref to the DOM element
  useImperativeHandle(ref, () => internalRef.current!, []);

  const isVisible = useOnScreen(internalRef);

  return (
    <div
      ref={internalRef}
      className={`${className} transition-all duration-1000 ${delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      {children}
    </div>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;
