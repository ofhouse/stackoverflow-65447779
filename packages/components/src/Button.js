import React, { useEffect, useCallback } from "react";
import "./Button.css";

export const Button = props => (
  <button className="Button" onClick={props.onClick} {...props}>
    {props.children}
  </button>
);