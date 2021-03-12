import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import classnames from "classnames";

export default function WeekdayPicker({
  check_state,
  setcheck_state,
  readonly,
}) {
  const WEEKDAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const isChecked = (index) => {
    return check_state & (1 << index);
  };

  const toggleChecked = (index) => {
    setcheck_state(check_state ^ (1 << index));
  };

  return (
    <>
      <ButtonGroup className="mb-3 w-100">
        {WEEKDAYS_SHORT.map((item, index) => (
          <Button
            aria-pressed={isChecked(index)}
            autoComplete="off"
            color="white"
            className={classnames("border shadow-none", {
              active: isChecked(index),
              disabled: !isChecked(index) && readonly,
            })}
            style={{
              padding: "8px 0px",
            }}
            onClick={() => {
              if (!readonly) toggleChecked(index);
            }}
            key={index}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}