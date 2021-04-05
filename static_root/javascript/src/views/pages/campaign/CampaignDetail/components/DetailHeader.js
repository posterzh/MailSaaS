import React from "react";
import { Button, ButtonGroup, Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

const items = [
  {
    name: "OVERVIEW",
    link: "/details-overview",
  },
  {
    name: "SEQUENCE",
    link: "/details-sequence",
  },
  {
    name: "RECIPIENTS",
    link: "/details-recipients",
  },
  {
    name: "SETTINGS",
    link: "/details-settings",
  },
];

function DetailHeader(props) {
  const { color, activeItem, id } = props;
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <Button
          color="transparent"
          onClick={() => {
            props.history.push({
              pathname: "/app/admin/campaign/list",
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
                  console.log(`/app/admin/campaign/${id}${item.link}`);
                  props.history.push({
                    pathname: `/app/admin/campaign/${id}${item.link}`
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
