import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import classnames from "classnames";

export default function CampaignTabs(props) {
  const { tabs, activeTab } = props;

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <ButtonGroup role="group">
          {tabs.map((item, index) => {
            return (
              <Button
                color="secondary"
                type="button"
                className={classnames({
                  active: activeTab == index,
                })}
                key={index}
                style={{cursor: 'normal'}}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    </>
  );
}
