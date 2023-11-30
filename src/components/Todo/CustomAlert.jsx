import { Alert } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../redux-store/DialogSlice";

const CustomAlert = () => {
  const open = useSelector((state) => state?.dialogBox?.alert?.status);
  const type = useSelector((state) => state?.dialogBox?.alert?.type);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        dispatch(toggleAlert());
      }, 2000);
    }
  }, [open]);

  return (
    <>
      <Alert
        open={open}
        color={type === "success" ? "green" : "red"}
        animate={{
          mount: {
            x: 0,
          },
          unmount: {
            x: 100,
          },
        }}
        className="absolute bottom-5 !rounded-none right-0 w-1/3 h-12 text-sm font-MontSerat"
      >
        {type === "success"
          ? "Task Edited Successfully"
          : "Task Deleted Successfully"}
      </Alert>
    </>
  );
};

export default CustomAlert;
