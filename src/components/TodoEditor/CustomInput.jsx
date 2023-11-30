import { Input, Textarea, Typography } from "@material-tailwind/react";
import { Field } from "formik";
import React from "react";

const CustomInput = ({ type, title, isTextArea, ...props }) => {
  return (
    <Field {...props}>
      {({ field, form, meta }) => {
        return (
          <>
            <Typography variant="small" className="font-Montserat">
              {title}
            </Typography>

            {/* this check is done to identify whether the given element is an input field or a text area */}

            {isTextArea ? (
              <>
                <Textarea
                  {...field}
                  className={`!border !border-gray-400 text-gray-600 ${
                    meta.error && meta.touched && "!border-red-600"
                  }`}
                  labelProps={{
                    className: "hidden",
                  }}
                />
                {/* error handling triggered when the form is incomplete */}
                {meta?.error && meta?.touched && (
                  <Typography
                    variant="small"
                    className="text-xs text-red-600 font-Montserat"
                  >
                    {meta?.error}
                  </Typography>
                )}
              </>
            ) : (
              <>
                <Input
                  {...field}
                  type={type}
                  className={`!border !border-gray-400 text-gray-600 ${
                    meta.error && meta.touched && "!border-red-600"
                  }`}
                  labelProps={{
                    className: "hidden",
                  }}
                />

                {/* error handling triggered when the form is incomplete */}

                {meta?.error && meta?.touched && (
                  <Typography
                    variant="small"
                    className="text-xs text-red-600 font-Montserat"
                  >
                    {meta?.error}
                  </Typography>
                )}
              </>
            )}
          </>
        );
      }}
    </Field>
  );
};

export default CustomInput;
