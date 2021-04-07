import React from "react";
import { Container, Row, Col, Input, FormGroup, Label, Button } from "reactstrap";
import ReactQuill from "react-quill";
import { parseCSVRow, parseTemplate } from '../../../../../utils/Utils';

export default class FollowUpPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wait_days: 1,
      subject: "",
      email_body: "",
    };
  }

  getPlural = (val, unit) => {
    if (!val) return unit;
    
    if (val > 1) {
      return val + ' ' + unit + 's';
    } else {
      return val + ' ' + unit;
    }
  }
  render() {
    const { index, onDelete, data, preview, replacement } = this.props;

    return (
      <Container fluid>
        <Row className="mt-3">
          <Col md={12} className="alignRight">
            <Row>
              {index == 0 && <h2 className="display-6">Follow-ups</h2>}
            </Row>
            {preview ? 
            <>
              <Row>
                <i className="fa fa-reply"></i><span>&nbsp;&nbsp;{this.getPlural(data.wait_days, 'day')} later</span>
              </Row>
            </> 
            : 
            <>
              <Row>
                <Col>
                  <FormGroup className="row align-center">
                    <Label
                      className="form-control-label"
                      htmlFor="iputWaitDays"
                    >
                     <i className="fa fa-reply"></i>&nbsp; Wait X days:&nbsp;
                    </Label>
                    <Col md="2">
                      <Input
                        defaultValue={data.wait_days}
                        className="form-control-sm"
                        id="iputWaitDays"
                        type="number"
                        onChange={(e) => {
                          this.setState({ wait_days: e.target.value });
                          data.wait_days = e.target.value;
                        }}
                      />
                    </Col>
                  </FormGroup>
                  {onDelete && 
                    <Button outline
                      size="sm"
                      type="button"
                      color="warning"
                      onClick={() => onDelete(index)}
                      style={{position: 'absolute', right: 0, top: 5}}
                    >
                      <i style={{ paddingRight: 5 }} className="fa">
                        &#xf014;
                      </i>
                      DELETE
                    </Button>
                  }
                </Col>
              </Row>
            </>
            }
            <Row className="mt-0">
              <Input
                value={preview && replacement ? parseTemplate(data.email_subject, replacement) : data.email_subject}
                onChange={(e) => {
                  this.setState({ email_subject: e.target.value });
                  data.email_subject = e.target.value;
                }}
                type="text"
                className="form-control-sm"
                name="subject"
                placeholder="Subject"
                required={!preview}
                disabled={preview}
              />
            </Row>
            <Row>
              <Col className="p-0">
                <ReactQuill
                  ref={ref => {
                    if (!preview)
                      data['ref'] = ref
                  }}
                  defaultValue={preview && replacement ? parseTemplate(data.email_body, replacement) : data.email_body}
                  onChange={(value) => {
                    this.setState({ email_body: value });
                    data.email_body = value;
                  }}
                  theme={preview ? "bubble" : "snow"}
                  readOnly={preview}
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
