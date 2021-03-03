import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { withRouter } from "react-router-dom";

const items = [
  {
    name: "START",
    link: "/app/admin/CampaignStart",
  },
  {
    name: "RECIPIENT",
    link: "/app/admin/CampaignRecipient",
  },
  {
    name: "COMPOSE",
    link: "/app/admin/CampaignCompose",
  },
  {
    name: "PREVIEW",
    link: "/app/admin/CampaignPreview",
  },
  {
    name: "OPTIONS",
    link: "/app/admin/CampaignOptions",
  },
  {
    name: "SEND",
    link: "/app/admin/CampaignSend",
  },
];

function CampaignsHeader(props) {
  const { color, activeItem } = props;
  const id = props.history.location.state && props.history.location.state.id;
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <ButtonGroup role="group">
          {items.map((item, index) => {
            return (
              <Button
                color={color}
                type="button"
                className={activeItem == item.name ? "active" : ""}
                onClick={() => {
                  props.history.push({
                    pathname: item.link,
                    state: { id },
                  });
                }}
                key={index}
              >
                {item.name}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    </>
  );
}

export default withRouter(CampaignsHeader);
