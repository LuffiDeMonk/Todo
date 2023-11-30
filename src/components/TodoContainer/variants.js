export const variants = {
  hidden: {
    scale: 0,
  },
  //the custom property is accessed here
  visible: (i) => ({
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 50,
      delay: i * 0.3, //this delays the animation
    },
  }),
};
