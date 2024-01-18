import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Notification = (props) => {
  const [show, setShow] = React.useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let specialClasses = "";

  if (props.status === "error") {
    specialClasses = "text-danger";
  }
  if (props.status === "success") {
    specialClasses = "text-primary";
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={specialClasses}>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Notification;