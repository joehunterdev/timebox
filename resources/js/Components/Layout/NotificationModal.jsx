import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const NotificationModal = (props) => {
    const [show, setShow] = React.useState(true);
    const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false);
        dispatch(uiActions.clearNotification());
    };

    let variant = "";

    if (props.status === "error") {
        variant = "bg-warning-subtle";
    }
    if (props.status === "success") {
        variant = "bg-success-subtle";
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className={variant}>
                <Modal.Header closeButton>
                    <Modal.title>{props.title}</Modal.title>
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

export default NotificationModal;