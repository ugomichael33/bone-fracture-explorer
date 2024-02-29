import React from "react";

interface CustomButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    React.PropsWithChildren {
  buttonColor?: string;
}

function CustomButton({
  children,
  buttonColor,
  ...restOfProps
}: CustomButtonProps) {
  return (
    <button
      {...restOfProps}
      className={`${buttonColor} border rounded-full h-[29px] px-2 font-bold custom-button-class`}
    >
      <i className={`bi bi-record-fill  me-1`} />
      {children}
    </button>
  );
}

export default CustomButton;
