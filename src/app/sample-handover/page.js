"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { MdQrCodeScanner } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "/public/css/update-booking.css";
import "/public/css/sample-handover.css";
import PageHeader from "../component/page-header";

import { useEffect, useState,Fragment  } from 'react';
import { useRouter } from 'next/navigation';
import { LabPackageBooking } from '@/api_calls/LabPackageBooking';
import { UpdateHandoverLabDetails } from '@/api_calls/UpdateHandoverLabDetails';
import { LabBranches } from '@/api_calls/LabBranches';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import BookingList from '@/components/BookingList';
import Sidebar from "../component/sidebar";
import SignaturePad from '@/components/SignaturePad';
import BarcodeScannerPopup from '@/components/BarcodeScannerPopup';
import SignaturePadPopup from '@/components/SignaturePadPopup';


export default function samplehandover() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userPackageBooking, setUserPackageBooking] = useState([]);
  const [handoverLabPackageBooking, setHandoverLabPackageBooking] = useState({});
  const [labBranches, setLabBranches] = useState([]);
  const [signatureData, setSignatureData] = useState('');

  const [selectedBookings, setSelectedBookings] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckboxChange = (bookingId) => {
    // Check if the bookingId is already in the selectedBookings array
    const isSelected = selectedBookings.includes(bookingId);

    // Update the selectedBookings array based on checkbox status
    if (isSelected) {
      setSelectedBookings((prevSelectedBookings) =>
        prevSelectedBookings.filter((id) => id !== bookingId)
      );
    } else {
      setSelectedBookings((prevSelectedBookings) => [
        ...prevSelectedBookings,
        bookingId,
      ]);
    }

    const updatedTotalPrice = userPackageBooking.reduce((sum, booking) => {
      if (selectedBookings.includes(booking.id)) {
        return sum + parseFloat(booking.package_price);
      }
      return sum;
    }, 0);

    setTotalPrice(updatedTotalPrice);
  };

  const handleConfirm = () => {
    // Handle the logic when the "Confirm" button is clicked
    // You can use the selectedBookings array for further processing

    // For example, you can update the UI or make an API call
    // to add the selected bookings to the second <div>
    // ...

    // Close the Offcanvas after confirming
    handleClose();
  };

  const [isSignaturePopupOpen, setIsSignaturePopupOpen] = useState(false);
  const openSignaturePopup = () => {
    setIsSignaturePopupOpen(true);
  };

  const closeSignaturePopup = () => {
    setIsSignaturePopupOpen(false);
  };
  
  const handleSignatureChange = (data) => {
    setSignatureData(data);  
    setHandoverLabPackageBooking({ ...handoverLabPackageBooking, lab_signature: data })
  };

  const handleSaveSignature = () => {
    console.log('Signature saved:', signatureData);
    closeSignaturePopup();
  };

  const handleTextAreaChange = (value) => {
    // Handle the change in the text area value if needed
    setHandoverLabPackageBooking(prev => {
      return { ...prev, remark: value}
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await LabPackageBooking('confirmed');
        setUserPackageBooking(res);
        console.log('userPackageBooking:', res);
      } catch (error) {
        console.error(error);
      }

      try {
        const res = await LabBranches();
        setLabBranches(res);
        console.log('labBranches:', res);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    //console.log(selectedBookings);
    console.log(handoverLabPackageBooking);
    try {
      const res = await UpdateHandoverLabDetails(handoverLabPackageBooking,selectedBookings);
      console.log(res);
      router.push('/confirmed-booking');
    } catch (error) {
      console.error(error);
    }

  };

  // useEffect(() => {
  //   alert('dasda');
  // }, [userPackageBooking]);


  return (
    <>
      <Sidebar />
      <PageHeader heading="Sample Handover" />
      <section className="sample-handover section-padding">
        <Container>
         
          <Row>
            <Col>
              <Form  onSubmit={handleSubmit}>
                <Button
                  className="btn web-stroke-btn w-100 mb-3"
                  onClick={handleShow}
                >
                  <FaPlus /> Click To Add Bookings
                </Button>

                <Offcanvas
                  show={show}
                  onHide={handleClose}
                  placement="bottom"
                  className="sample-handover-modal"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add Bookings</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>              
                  {userPackageBooking.length > 0 ? (
                    userPackageBooking.map((booking) => (
                      <Form.Group
                        key={booking.id}
                        className="mb-3 custom-checkbox"
                      >
                        <Form.Control
                          type="checkbox"
                          name="bookings"
                          id={`booking${booking.id}`}
                          checked={selectedBookings.includes(booking.id)}
                          hidden
                          onChange={() => handleCheckboxChange(booking.id)}
                        />
                        <Form.Label
                          className="sample-booking-box"
                          htmlFor={`booking${booking.id}`}
                        >
                        <p>
                          <span>Name:</span> <br /> {booking.name}
                        </p>
                        <p>
                          <span>Number:</span> <br />{booking.contact}
                        </p>
                        <p>
                          <span>Booking id</span> <br /> {booking.id}
                        </p>
                        <p>
                          <span>Package Price</span> <br /> {booking.package_price}
                        </p>
                      </Form.Label>
                    </Form.Group>  
                    ))) : (
                      <div className="web-box">
                        <h2 className="box-heading">No bookings found.</h2>
                      </div>
                    )}                
                    <Button className="btn web-btn w-100"  onClick={handleConfirm}>Confirm</Button>
                  </Offcanvas.Body>
                </Offcanvas>

                <div>
                  {selectedBookings.map((bookingId) => {
                    const selectedBooking = userPackageBooking.find(
                      (booking) => booking.id === bookingId
                    );

                    return (
                      <div style={{ border: '1px solid #ccc', padding: '10px' }} className="sample-booking-box mb-3" key={selectedBooking.id}>
                        <p>
                          <span>Name:</span> <br /> {selectedBooking.name}
                        </p>
                        <p>
                          <span>Number:</span> <br /> {selectedBooking.contact}
                        </p>
                        <p>
                          <span>Package Name</span> <br /> {selectedBooking.package_name}
                        </p>
                        <p>
                          <span>Package price</span> <br /> {selectedBooking.package_Price}
                        </p>
                      </div>
                    );
                  })}
                </div>           

                <Form.Group className="mb-3">
                  <Form.Label>Select Receiver Type:</Form.Label>
                  <Form.Select 
                  className="page-form-control"
                  onChange={(e) => setHandoverLabPackageBooking({ ...handoverLabPackageBooking, branch_id: e.target.value })}
                  >
                    <option>Labs</option>
                    {labBranches.map((branch) => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {branch.name} - {branch.area_name}, {branch.city_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cash</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cash"
                      value={totalPrice}
                      className="page-form-control"
                      onChange={(e) => setHandoverLabPackageBooking({ ...handoverLabPackageBooking, cash_submit: e.target.value })}
                      readOnly
                    />
                  </Form.Group>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Given to</Form.Label>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <Form.Control
                      type="text"
                      placeholder=" "
                      className="page-form-control"
                    />
                    <Link href={"#"} className="scan text-center">
                      <MdQrCodeScanner />
                      <br />
                      Scan
                    </Link>
                  </div>
                </Form.Group> */}
                {/* <Link href={"#"} className="text-center mb-3 d-block">
                  Take sample receivers signature
                </Link> */}
                <div>
                  <h2 className="box-heading">
                    Lab Signature 
                  </h2>
                  {signatureData ? (
                      <div>
                        <p>Signature Saved</p>
                        {/* <img src={signatureData} alt="Customer Signature" /> */}
                      </div>
                  ) : (
                    <a  className="sign text-center mb-3 d-block" onClick={openSignaturePopup}>
                      Take order receivers signature
                    </a>
                  )}

                  {isSignaturePopupOpen && (                
                    <div className="popup-container-signature">
                      <div className="popup-content-signature">
                        <SignaturePadPopup
                          onSignatureChange={handleSignatureChange}
                          onSaveSignature={handleSaveSignature}
                          onClose={closeSignaturePopup}
                        />
                      </div>
                  </div>
                  )}
                  <style jsx>{`
                      .popup-container-signature {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      }

                      .popup-content-signature {
                        background: #fff;
                        padding: 2px;
                        border-radius: 8px;
                      }
                    `}
                  </style>
                </div>
                <Form.Group controlId="additionalInfo">
                  <Form.Label>Additional Information:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    placeholder="Provide additional information..."
                    onChange={(e) => handleTextAreaChange(e.target.value)}
                  />
                </Form.Group>
                <Link href={"#"} className="btn web-btn w-100" onClick={handleSubmit}>
                  Submit
                </Link>
                
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
