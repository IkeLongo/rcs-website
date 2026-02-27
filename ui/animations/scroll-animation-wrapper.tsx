"use client";

import { motion, Easing } from "framer-motion";
import { useState, useRef, ReactNode } from "react";

type AnimationVariant = {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
};

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  // Animation customization props
  initialY?: number;
  duration?: number;
  delay?: number;
  easing?: Easing | Easing[];
  viewportAmount?: number;
  // Animation variants
  animationType?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'scale' | 'custom';
  customInitial?: AnimationVariant;
  customAnimate?: AnimationVariant;
}

const ScrollAnimationWrapper = ({
  children,
  className = "",
  id,
  initialY = 60,
  duration = 0.6,
  delay = 0,
  easing = "easeOut",
  viewportAmount = 0.3,
  animationType = 'slideUp',
  customInitial,
  customAnimate,
}: ScrollAnimationWrapperProps) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Handle viewport changes with scroll direction awareness
  const handleViewportChange = (inView: boolean) => {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollY.current;
    
    if (inView) {
      // Component is in view - always show animation
      setIsInView(true);
      setHasAnimated(true);
    } else {
      // Component is out of view
      if (isScrollingUp && hasAnimated) {
        // Only reset if scrolling up and animation has already played
        setIsInView(false);
        setHasAnimated(false);
      }
      // If scrolling down past the component, keep it animated (don't reset)
    }
    
    lastScrollY.current = currentScrollY;
  };

  // Animation variants
  const getAnimationVariants = (): { initial: AnimationVariant; animate: AnimationVariant } => {
    switch (animationType) {
      case 'slideUp':
        return {
          initial: { y: initialY, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        };
      case 'slideDown':
        return {
          initial: { y: -initialY, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        };
      case 'slideLeft':
        return {
          initial: { x: initialY, opacity: 0 },
          animate: { x: 0, opacity: 1 }
        };
      case 'slideRight':
        return {
          initial: { x: -initialY, opacity: 0 },
          animate: { x: 0, opacity: 1 }
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 }
        };
      case 'scale':
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 }
        };
      case 'custom':
        return {
          initial: customInitial || { y: initialY, opacity: 0 },
          animate: customAnimate || { y: 0, opacity: 1 }
        };
      default:
        return {
          initial: { y: initialY, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      ref={componentRef}
      initial={variants.initial}
      animate={isInView ? variants.animate : variants.initial}
      onViewportEnter={() => handleViewportChange(true)}
      onViewportLeave={() => handleViewportChange(false)}
      viewport={{ amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: easing,
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;