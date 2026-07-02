export const defaultEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.2 } },
  exit: { opacity: 0, y: -8, transition: { ease: defaultEasing, duration: 0.2 } },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { ease: defaultEasing } },
};

export const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.4 } },
};

export const tagStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export const tagVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.3 } },
};

export const expStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const expVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.35 } },
};

export const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { ease: defaultEasing, duration: 0.6 } },
};
