import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import classnames from "classnames";

export default function WeekdayPicker({ checkState, setCheckState, readonly }) {
  const WEEKDAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // const [readonly, setReadonly] = useState(false);
  // const [checkState, setCheckState] = useState(5);

  const isChecked = (index) => {
    return checkState & (1 << index);
  };

  const toggleChecked = (index) => {
    setCheckState(checkState ^ (1 << index));
  };

  return (
    <>
      <ButtonGroup>
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
              padding: readonly ? "6px 8px" : "10px 12px",
            }}
            onClick={() => {
              if (!readonly) toggleChecked(index);
            }}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
