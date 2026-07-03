export const defaultEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.35 } },
  exit: { opacity: 0, y: -24, transition: { ease: defaultEasing, duration: 0.3 } },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.4 } },
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
  visible: { transition: { staggerChildren: 0.06 } },
};

export const tagVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.35 } },
};

export const expStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const expVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.4 } },
};

export const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { ease: defaultEasing, duration: 0.6 } },
};
