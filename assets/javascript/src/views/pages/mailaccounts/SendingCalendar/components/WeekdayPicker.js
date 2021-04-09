import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import classnames from "classnames";

export default function WeekdayPicker({ block_days, setBlock_days, readonly }) {
  const WEEKDAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const isChecked = (index) => {
    index = (index + 6) % 7;
    return block_days & (1 << index);
  };

  const toggleChecked = (index) => {
    index = (index + 6) % 7;
    setBlock_days(block_days ^ (1 << index));
  };

  // console.log("block days: ", block_days);

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
