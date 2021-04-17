import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";

export default class RecipientDeleteModal extends React.Component {
  render() {
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.props.isOpen}
          toggle={this.props.close}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Confirmation
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.props.close}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">Are you sure to delete this recipient?</div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={this.props.close}
            >
              Close
            </Button>
            <Button color="danger" type="button" onClick={this.props.delete}>
              Delete
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}
