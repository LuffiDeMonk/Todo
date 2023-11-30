export const variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 800,
      damping: 200,
      type: "spring",
    },
  },
};
