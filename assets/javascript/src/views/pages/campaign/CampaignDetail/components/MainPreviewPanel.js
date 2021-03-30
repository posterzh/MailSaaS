import React, { Component } from "react";
import {
  Badge,
} from "reactstrap";

class MainPreviewPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { subject, body } = this.props;

    return (
      <div className="timeline-block mb-1">
        <span className="timeline-step badge-success">
          <i className="fa fa-envelope"></i>
        </span>
        <div className="timeline-content full-max-w">
          <h5 className="mb-0">{subject}</h5>
          <p className="text-sm mt-1 mb-0" dangerouslySetInnerHTML={{ __html: body }}>
          </p>
          <div className="mt-3" style={{ position: "absolute", top: -12, right: 0 }}>
            <Badge color="danger" pill>
              <i className="fa fa-pause"></i>
            </Badge>
          </div>
        </div>
      </div>
    )
  }
}

export default MainPreviewPanel;