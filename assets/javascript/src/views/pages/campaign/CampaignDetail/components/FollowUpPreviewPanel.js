import React, { Component } from "react";

class FollowUpPreviewPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { subject, body, waitDays } = this.props;

    return (
      <div className="timeline-block mb-1">
        <span className="timeline-step badge-success">
          <i className="fa fa-reply"></i>
        </span>
        <div className="timeline-content">
          <small className="text-muted font-weight-bold">
            Wait {waitDays} days
        </small>
          <h5 className="mt-3 mb-0">{subject}</h5>
          <p className="text-sm mt-1 mb-0" dangerouslySetInnerHTML={{ __html: body }}>
          </p>
        </div>
      </div>
    )
  }
}

export default FollowUpPreviewPanel;
