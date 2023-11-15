import React from "react";
import { Resizable } from "react-resizable";

export default function ResizableCell({ children, width, ...rest }) {
  return (
    <Resizable
      width={width}
      height={0}
      handle={<div className="react-resizable-handle" />}
      {...rest}
    >
      <div>{children}</div>
    </Resizable>
  );
}
