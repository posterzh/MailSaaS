import React from "react";

// reactstrap components
import { Button, ButtonGroup } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

function CampaignsHeader(props) {
  let id = props.history.location.state && props.history.location.state.id;
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <ButtonGroup>
          <Button
            color="secondary"
            type="button"
            className={props.active == "START" ? "active" : ""}
            onClick={() => {
              props.history.push({
                pathname: "/app/admin/CampaignStart",
                state: { id },
              });
            }}
          >
            START
          </Button>

          <Button
            color="secondary"
            type="button"
            className={props.active == "RECIPIENT" ? "active" : ""}
            onClick={() => {
              props.history.push({
                pathname: "/app/admin/CampaignRecipient",
                state: { id },
              });
            }}
          >
            RECIPIENT
          </Button>

          <Button
            color="secondary"
            type="button"
            className={props.active == "COMPOSE" ? "active" : ""}
            onClick={() => {
              props.history.push({
                pathname: "/app/admin/CampaignCompose",
                state: { id },
              });
            }}
          >
            COMPOSE
          </Button>

          <Button
            color="secondary"
            type="button"
            className={props.active == "PREVIEW" ? "active" : ""}
            onClick={() => {
              props.history.push({
                pathname: "/app/admin/CampaignPreview",
                state: { id },
              });
            }}
          >
            PREVIEW
          </Button>

          <Button
            color="secondary"
            type="button"
            className={props.active == "OPTIONS" ? "active" : ""}
            onClick={() => {
              props.history.push({
                pathname: "/app/admin/CampaignOptions",
                state: { id },
              });
            }}
          >
            OPTIONS
          </Button>

          <Button
            color="secondary"
            type="button"
            className={props.active == "SEND" ? "active" : ""}
            onClick={() => {
              props.history.push({
                pathname: "/app/admin/CampaignSend",
                state: { id },
              });
            }}
          >
            SEND
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default withRouter(CampaignsHeader);
