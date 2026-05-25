import type { Variants, Transition } from 'framer-motion';

// Snappy ease-out cubic-bezier — feels confident, not rubbery
export const ease: Transition['ease'] = [0.22, 1, 0.36, 1];

// Slide-to-slide transition (used by AnimatePresence)
export const slideFade: Variants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -12, filter: 'blur(4px)' },
};

// Stagger container: parent of children that animate in sequence
export const staggerParent: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
  exit: {},
};

// Standard fade-up for any child element
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease } },
};

// Subtle scale-in for big numbers / hero elements
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.55, ease } },
  exit:    { opacity: 0, scale: 0.98, transition: { duration: 0.25, ease } },
};

// Soft fade only — for ambient elements (glows, decorative orbs)
export const softFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease } },
  exit:    { opacity: 0, transition: { duration: 0.25, ease } },
};
