import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Alert from "react-bootstrap/Alert";
const NotificationAlert = (props) => {
    const [show, setShow] = React.useState(true);
    const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false);
        dispatch(uiActions.clearNotification());
    };
    let variant = "";

    if (props.status === "error") {
        variant = "danger";
    }
    if (props.status === "success") {
        variant = "primary";
    }

    return (
        <>
            <Alert variant={variant} onClose={handleClose()} dismissible>
                <Alert.Heading>{props.title}</Alert.Heading>
                <p>{props.message}</p>
            </Alert>
        </>
    );
};

export default NotificationAlert;
