import React from "react";
interface IProps {
  heading: string;
  list: string[];
  classes: string;
}
export default function RolesAndPermissions(props: IProps) {
  const { heading, list, classes } = props;
  return (
    <div>
      <h1>{heading}</h1>
      <div>
        {list.map((val, i) => (
          <span key={i} className={classes} data-testid="role">
            {val}
          </span>
        ))}
      </div>
    </div>
  );
}
