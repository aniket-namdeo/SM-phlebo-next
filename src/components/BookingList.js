// src\components\BookingList.js
"use client";
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import "/public/css/pending-booking.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBookingStatus } from '@/api_calls/BookingStatusApi';

const BookingList = ({ bookings }) => {
  const router = useRouter();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = (booking) => {
    setSelectedBooking(booking);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // Make the API call using the function from BookingStatusApi.js
      await updateBookingStatus(selectedBooking.id, newStatus);

      // Close the popup
      setShowPopup(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {bookings.length > 0 ? (bookings.map((booking) => (
        <div key={booking.id} className="web-box">
          <h2 className="box-heading">{booking.name}</h2>
          <div className="box-body">
            <p>
              <span>Booking ID:</span> <br /> {booking.id}
            </p>
            <p>
              <span>Age:</span> <br /> {booking.age}
            </p>
            <p>
              <span>Gender:</span> <br /> {booking.gender}
            </p>
            <p>
              <span>Email:</span> <br />
              <Link href={`mailto:${booking.email}`}>{booking.email}</Link>
            </p>
            <p>
              <span>Collection Date:</span> <br />{booking.booking_date}
            </p>
            <p>
              <span>Collection Time:</span> <br /> {booking.slot_time}
            </p>
            <p>
              <span>Booking Amount:</span> <br /> {booking.package_price}
            </p>
            <p>
              <span>Amount Due:</span> <br /> {booking.package_price}
            </p>
            <p>
              <span>Booking Status:</span> <br /> {booking.booking_status}
            </p>
            <p>
              <span>Booking Source:</span> <br /> Redcliffelabs
            </p>
            <Link
              href="#"
              className="btn web-btn w-100"
              onClick={() => handleButtonClick(booking)}
            >
              Proceed
            </Link>
            <Link href={`update-booking?id=${booking.id}`} 
              className="btn web-btn w-100">
              Update Details
            </Link>
          </div>
        </div>
      ))) : (
        <div className="web-box">
          <h2 className="box-heading">No bookings found.</h2>
        </div>
      )}

      <Modal show={showPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Booking Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Selected Booking ID: {selectedBooking?.id}</p>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={() => handleStatusChange('onHold')}>
              Put on Hold
            </Button>
            <Button variant="warning" size="lg" onClick={() => handleStatusChange('pending')}>
              Set as Pending
            </Button>
            <Button variant="success" size="lg" onClick={() => handleStatusChange('confirmed')}>
              Confirm
            </Button>
            <Button variant="danger" size="lg" onClick={() => handleStatusChange('canceled')}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookingList;