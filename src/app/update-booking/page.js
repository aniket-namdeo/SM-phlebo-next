"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "/public/css/update-booking.css";
import PageHeader from "../component/page-header";
import PageHeaderWithBack from "../component/page-header-with-back";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LabPackageBookingDetails } from '@/api_calls/LabPackageBookingDetails';
import { UpdateBookingMemberDetails } from '@/api_calls/UpdateBookingMemberDetails';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import BookingList from '@/components/BookingList';
import Swal from 'sweetalert2';

export default function updatebooking() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  
  const [snack, setSnack] = useState({
    open: false,
      message: ''
  });
  const snackClose = () => {
      setSnack({
          open: false,
          message: ''
      });
  };


  const [userPackageBooking, setUserPackageBooking] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log(userPackageBooking);
    const { name, email, contact, age , pincode , user_address} = userPackageBooking;
    if (!name.trim() || !email.trim() || !contact.trim() || !age.trim() || !pincode.trim() || !user_address.trim()  ) {
        Swal.fire({
          title: 'Error',
          text: 'All required fields must be filled.',
          icon: 'error',
        });
    } else {
      const otpAPI = await UpdateBookingMemberDetails(userPackageBooking.id,userPackageBooking); 
      if(otpAPI.status == 200){
        console.log(otpAPI.status); 
        setSnack({
          open: true,
          message: 'Successfully Update Member Details.'
        });
        router.push('/update-booking/step2?id='+userPackageBooking.id);     
      }else{
        setSnack({
            open: true,
            message: 'Something Wrong.'
        });
      }
    }

    
    
  };


  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get the latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported in this browser.');
    }

    const id = searchParams.get('id');
    async function fetchData() {
      try {
        const res = await LabPackageBookingDetails(id);
        setUserPackageBooking(res);
        console.log('userPackageBooking:', res);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleGetDirections = () => {
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${userPackageBooking.latitude},${userPackageBooking.longitude}`;
    window.open(googleMapsLink, '_blank');
  };


  return (
    <>
      <PageHeaderWithBack heading="Update Booking" />
      <section className="update-booking section-padding">
        <Container>
          <Row>
            <Col>
              <p className="mb-3 text-danger">Patient Details</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Relation*</Form.Label>
                  <Form.Select
                    className="page-form-control"
                    value={userPackageBooking.booking_for}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, booking_for: e.target.value })}
                  >
                    <option>Select Relation</option>
                    <option value="Self">Self</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="page-form-control"
                    value={userPackageBooking.name}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Age*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Age"
                    className="page-form-control"
                    value={userPackageBooking.age}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, age: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Gender*</Form.Label>
                  <Form.Select
                    className="page-form-control"
                    value={userPackageBooking.gender}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, gender: e.target.value })}
                  >
                    <option>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>

            
                <Form.Group className="mb-3">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="page-form-control"
                    value={userPackageBooking.email}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Age"
                    className="page-form-control"
                    value={userPackageBooking.contact}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, contact: e.target.value })}
                  />
                </Form.Group>
                {/*<Form.Group className="mb-3">
                  <Form.Label>Aadhaar Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter Aadhaar Number"
                    className="page-form-control"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Passport Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter Passport Number"
                    className="page-form-control"
                  />
                </Form.Group>
                 <Form.Group className="mb-3">
                  <Form.Label>House No./Plot No./Flat No.*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter House No."
                    className="page-form-control"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Appartment/Building/Colony/Block*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Appartment"
                    className="page-form-control"
                  />
                </Form.Group> */}
                <Form.Group className="mb-3">
                  <Form.Label>Landmark/Sublocality*</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Landmark"
                    style={{ height: "80px" }}
                    className="page-form-control"
                    value={userPackageBooking.user_address}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, user_address: e.target.value })}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Locality*</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Locality"
                    style={{ height: "80px" }}
                    className="page-form-control"
                  />
                </Form.Group>          */}
                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pincode"
                    className="page-form-control"
                    value={userPackageBooking.pincode}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, pincode: e.target.value })}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Latitude"
                    className="page-form-control"
                    value={userPackageBooking.latitude}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, latitude: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Longitude"
                    className="page-form-control"
                    value={userPackageBooking.longitude}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, longitude: e.target.value })}
                  />
                </Form.Group> */}

                <div className="mb-3 text-center">
                  <Link href="#" onClick={handleGetDirections} >Get direction to customer</Link>
                </div>

                <p className="text-danger mb-3 text-center">
                  *Location updated on 11/18/2023 at 9:10 AM
                </p>

                <Link href={"#"} className="btn web-stroke-btn mb-3 d-block" onClick={handleSubmit}>
                  Next
                </Link>

                {/* <Link href={ `update-booking/step2?id=${userPackageBooking.id}`} className="btn web-btn d-block">
                  Next
                </Link> */}
              </Form>
            </Col>
          </Row>
          <Snackbar
              open={snack.open}
              autoHideDuration={6000}
              onClose={snackClose}
              message={snack.message}
          />
        </Container>
      </section>
    </>
  );
}
