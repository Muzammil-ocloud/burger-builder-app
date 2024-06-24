import React from "react";
import classes from "./Input.module.css";
interface IProps {
  elementType: string;
  elementConfig: any;
  value: string;
  onChange: any;
}
function Input({ elementType, elementConfig, value, onChange }: IProps) {
  let inputElement = null;
  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.input}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.input}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.input}
          name={elementConfig.placeholder}
          onChange={onChange}
        >
          {elementConfig?.options.map((data: string) => {
            return (
              <option key={data} value={data}>
                {data}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.input}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
  }
  return <>{inputElement}</>;
}

export default Input;
