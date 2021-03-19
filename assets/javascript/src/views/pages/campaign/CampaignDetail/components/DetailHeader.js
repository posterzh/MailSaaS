import React from "react";
import { Button, ButtonGroup, Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

const items = [
  {
    name: "OVERVIEW",
    link: "/app/admin/campaign/details-overview",
  },
  {
    name: "SEQUENCE",
    link: "/app/admin/campaign/details-sequence",
  },
  {
    name: "RECIPIENTS",
    link: "/app/admin/campaign/details-recipients",
  },
  {
    name: "SETTINGS",
    link: "/app/admin/campaign/details-settings",
  },
];

function DetailHeader(props) {
  const { color, activeItem } = props;
  const id = props.history.location.state && props.history.location.state.id;
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <Button
          color="transparent"
          onClick={() => {
            props.history.push({
              pathname: "/app/admin/CampaignList",
            });
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </Button>
        <ButtonGroup>
          {items.map((item, index) => {
            return (
              <Button
                color={color}
                type="button"
                key={"header" + index}
                className={activeItem == item.name ? "active" : ""}
                onClick={() => {
                  props.history.push({
                    pathname: item.link,
                    state: { id },
                  });
                }}
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

export default withRouter(DetailHeader);
