import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './Notification.css';

const Notification = ({ show, onClose, message, variant }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={onClose} show={show} delay={3000} autohide bg={variant}>
        <Toast.Header>
          <strong className="me-auto">TODO</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notification;
