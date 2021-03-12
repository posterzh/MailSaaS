import React from "react";
import { Container, Row, Col, Input } from "reactstrap";
import ReactQuill from "react-quill";

export default class DripPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitDays: 1,
      subject: "",
      email_body: "",
    };
  }
  render() {
    const { index, onDelete, data} = this.props;

    return (
      <Container fluid>
        <Row className="mt-3">
          <Col md={12} className="alignRight">
            <Row>
              <h1 className="display-6">Drips</h1>
              {onDelete && 
                <div
                  className="btn btn-outline-warning btn-sm "
                  onClick={() => onDelete(index)}
                  style={{position: 'absolute', right: 0, top: 10}}
                >
                  <i style={{ padding: 5 }} className="fa">
                    &#xf014;
                  </i>
                  DELETE
                </div>
              }
            </Row>
            <Row>
              <p style={{ fontSize: "14px" }}>
                Unlike follow-ups, drips keep sending even after a recipient
                becomes a lead.{" "}
                <a href="">Learn how to customize Lead Catcher.</a>
              </p>
            </Row>
            <Row>
              <Col md={2} className="WaitDiv">
                <label className="filter_app_new">Wait X days</label>
                <Input
                  defaultValue={data.waitDays}
                  onChange={(e) => {
                    this.setState({ waitDays: e.target.value });
                    data.waitDays = e.target.value;
                  }}
                  type="number"
                  className="WaitInput"
                ></Input>
              </Col>
            </Row>
            <Row className="mt-3">
              <Input
                defaultValue={data.subject}
                onChange={(e) => {
                  this.setState({ subject: e.target.value });
                  data.subject = e.target.value;
                }}
                type="text"
                className="in"
                name="subject"
                placeholder="Subject"
                required
              />
            </Row>
            <Row>
              <Col className="p-0">
                <ReactQuill
                  value={data.email_body}
                  onChange={(value) => {
                    this.setState({ email_body: value });
                    data.email_body = value;
                  }}
                  theme="snow"
                  className="Quill_div"
                  modules={{
                    toolbar: [
                      ["bold", "italic"],
                      ["link", "blockquote", "code", "image"],
                      [
                        {
                          list: "ordered",
                        },
                        {
                          list: "bullet",
                        },
                      ],
                    ],
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
