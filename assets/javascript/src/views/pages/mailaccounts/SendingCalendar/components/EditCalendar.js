import React, { useState } from "react";
import {
  Button,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import WeekdayPicker from "./WeekdayPicker";

export default function ({
  currentCalendar,
  setCurrentCalendar,
  availableTimezones,
  saveEditing,
  cancelEditing,
}) {
  if (!currentCalendar) {
    return <h5>Loading...</h5>;
  } else {
    return (
      <>
        <FormGroup className="mt-4 mb-2">
          <div>
            <label className="form-control-label">Blocked out days</label>
          </div>
          <WeekdayPicker
            block_days={currentCalendar.block_days}
            setBlock_days={(value) =>
              setCurrentCalendar({
                ...currentCalendar,
                block_days: value,
              })
            }
            readonly={false}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <label className="form-control-label" htmlFor="start_time">
            Start time
          </label>
          <Input
            id="start_time"
            className="form-control-sm"
            type="time"
            value={currentCalendar.start_time}
            onChange={(e) =>
              setCurrentCalendar({
                ...currentCalendar,
                start_time: e.target.value,
              })
            }
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <label className="form-control-label" htmlFor="end_time">
            End time
          </label>
          <Input
            id="end_time"
            className="form-control-sm"
            type="time"
            value={currentCalendar.end_time}
            onChange={(e) =>
              setCurrentCalendar({
                ...currentCalendar,
                end_time: e.target.value,
              })
            }
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <label className="form-control-label" htmlFor="time_zone">
            Timezone
          </label>
          <Input
            id="time_zone"
            className="form-control-sm"
            type="select"
            className="form-control-sm"
            value={currentCalendar.time_zone}
            onChange={(e) =>
              setCurrentCalendar({
                ...currentCalendar,
                time_zone: e.target.value,
              })
            }
          >
            {availableTimezones.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup className="mb-2">
          <label className="form-control-label" htmlFor="max_emails_per_day">
            Max emails per day
          </label>
          <Input
            id="max_emails_per_day"
            className="form-control-sm"
            type="number"
            value={currentCalendar.max_emails_per_day}
            onChange={(e) =>
              setCurrentCalendar({
                ...currentCalendar,
                max_emails_per_day: e.target.value,
              })
            }
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <label className="form-control-label" htmlFor="minutes_between_sends">
            Minutes between sends
          </label>
          <Input
            id="minutes_between_sends"
            className="form-control-sm"
            type="number"
            value={currentCalendar.minutes_between_sends}
            onChange={(e) =>
              setCurrentCalendar({
                ...currentCalendar,
                minutes_between_sends: e.target.value,
              })
            }
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <label className="form-control-label" htmlFor="min_emails_to_send">
            Minimum emails to send at a time
          </label>
          <Input
            id="min_emails_to_send"
            className="form-control-sm"
            type="number"
            value={currentCalendar.min_emails_to_send}
            onChange={(e) =>
              setCurrentCalendar({
                ...currentCalendar,
                min_emails_to_send: e.target.value,
              })
            }
          />
        </FormGroup>

        <FormGroup>
          <label className="form-control-label" htmlFor="max_emails_to_send">
            Maximum emails to send at a time
          </label>
          <Input
            id="max_emails_to_send"
            className="form-control-sm"
            type="number"
            value={currentCalendar.max_emails_to_send}
            onChange={(e) =>
              setCurrentCalendar({
                ...currentCalendar,
                max_emails_to_send: e.target.value,
              })
            }
          />
        </FormGroup>

        <FormGroup className="mt-2">
          <Button
            color="danger"
            type="button"
            className="px-4"
            onClick={() => saveEditing(currentCalendar)}
          >
            SAVE
          </Button>
          <Button
            color="secondary"
            type="button"
            className="px-3"
            onClick={cancelEditing}
          >
            CANCEL
          </Button>
        </FormGroup>
      </>
    );
  }
}
