import React from "react";
import { Typography } from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import Todo from "../Todo/Todo";
import { variants } from "./variants";

const TodoContainer = ({ title, isPendingTask, data }) => {
  return (
    <div className="container">
      <div className="flex justify-between items-center w-full mb-4">
        <Typography
          variants="h2"
          color="black"
          className="text-2xl font-semibold font-Montserat dark:text-white"
        >
          {title}
        </Typography>
        <div>
          {isPendingTask && (
            <Typography
              variant="small"
              className="text-xs font-Montserat text-gray-500"
            >
              There are {data?.length} pending missions
            </Typography>
          )}
        </div>
      </div>
      <motion.div className="flex flex-col gap-3">
        {/* AnimatePresence is wrapped around this motion component so that it can detect whether a component leaves the DOM and runs the animation accordingly */}
        <AnimatePresence>
          {data?.map((todo, index) => (
            <motion.div
              variants={variants}
              exit={{ opacity: 0, x: -200 }} //this animation runs when the component unmounts from the DOM
              initial="hidden"
              animate="visible"
              key={todo?.id} //the key is a unique identifier which help react keep track of every changing component
              custom={index} //
            >
              <Todo variants={variants} todo={todo} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TodoContainer;
