import React, { Component } from "react";
import {
  Badge,
} from "reactstrap";

class DripPreviewPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { subject, body, waitDays } = this.props;

    return (
      <div className="timeline-block mb-1">
        <span className="timeline-step badge-success">
          <i className="fas fa-stopwatch"></i>
        </span>
        <div className="timeline-content">
          <small className="text-muted font-weight-bold">
            Wait {waitDays} days
        </small>
          <h5 className="mt-3 mb-0">{subject}</h5>
          <p className="text-sm mt-1 mb-0" dangerouslySetInnerHTML={{ __html: body }}>
          </p>
          <div className="mt-3">
            <Badge color="success" pill style={{ position: "absolute", top: 6, right: 0 }}>
              <i className="fa fa-play"></i>
            </Badge>
          </div>
        </div>
      </div>
    )
  }
}

export default DripPreviewPanel;
