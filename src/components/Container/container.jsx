// components/Container.jsx
import React from "react";

const NAMED_MAX = { sm:640, md:768, lg:1024, xl:1280, "2xl":1536 };
const PAD = {
  none: "px-0",
  sm: "px-3",
  md: "px-4 md:px-6 lg:px-8",
  lg: "px-6 md:px-8 lg:px-10",
  xl: "px-6 md:px-10 lg:px-12",
};

export default function Container({
  max = "2xl",
  padding = "md",
  fluid = false,
  className = "",
  children,
  ...rest
}) {
  const maxPx = typeof max === "number" ? max : NAMED_MAX[max];
  const maxClass = fluid ? "" : `max-w-[${maxPx}px]`;
  return (
    <div className={`mx-auto w-full ${PAD[padding]} ${maxClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}
