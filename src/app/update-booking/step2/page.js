"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { HiOutlineMinusSm } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import Table from "react-bootstrap/Table";
import "/public/css/update-booking.css";
import PageHeader from "../../component/page-header";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LabPackageBookingDetails } from '@/api_calls/LabPackageBookingDetails';
import { UpdateBookingMemberDetails } from '@/api_calls/UpdateBookingMemberDetails';
import { LabPackages } from '@/api_calls/LabPackages';
import { ThyrocareSlot } from '@/api_calls/ThyrocareSlot';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import BookingList from '@/components/BookingList';

export default function step2() {

  const searchParams = useSearchParams();
  const [userPackageBooking, setUserPackageBooking] = useState({});
  const [labPackages, setLabPackages] = useState([]);
  const [slots, setSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState(''); 

    
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

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log('Data:', userPackageBooking);
    setSnack({
        open: true,
        message: 'Successfully Update Package Details.'
    });
    //const otpAPI = await UpdateBookingMemberDetails(userPackageBooking.id,userPackageBooking); 
  };


  useEffect(() => {
    const id = searchParams.get('id');
    async function fetchData() {
      try {
        const res = await LabPackageBookingDetails(id);
        setUserPackageBooking(res);
        const lab_res = await LabPackages();
        setLabPackages(lab_res);
        console.log('userPackageBooking:', res);
      } catch (error) {
        console.error(error);
      }
      const dynamicParams = {
        pincode: '700051',
        newdate: '2023-12-24',
      };

      try {
        const data = await ThyrocareSlot(dynamicParams);
          setSlots([
            "06:00 - 06:30",
            "06:30 - 07:00",
            "07:00 - 07:30",
            "07:30 - 08:00",
            "08:00 - 08:30",
            "09:30 - 10:00",
            "10:00 - 10:30",
            "10:30 - 11:00",
            "11:00 - 11:30",
            "11:30 - 12:00",
            "12:00 - 12:30",
            "12:30 - 13:00",
            "13:00 - 13:30",
            "13:30 - 14:00"
        ]);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  const handleDateChange = (event) => {
    // Update the selectedDate state when the date field changes
    setSelectedDate(event.target.value);
  };

  const priceDifference = userPackageBooking.package_mrp - userPackageBooking.package_price;

  // Helper function to convert camelCase to Title Case
  const camelToTitleCase = (str) => {
    if (!str) {
      return '';
    }
    return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const removePackage = () => {
    // Set userPackageBooking to an object with package_name as an empty string
    setUserPackageBooking({ ...userPackageBooking, package_name: '' });
  };


  return (
    <>
      <PageHeader heading="Update Booking" />
      <section className="update-booking section-padding">
        <Container>
          <Row>
            <Col>
              <div className="web-box">
                <h2 className="box-heading">Order Details</h2>
                <div className="box-body">
                  <Form onSubmit={handleSubmit}>
                    <div className="info-box mb-3">
                      <p>
                        <span>Primary User Name:</span>
                        <br /> {userPackageBooking.name}
                      </p>
                      <p>
                        <span>Primary User Age</span>
                        <br /> {userPackageBooking.age}
                      </p>
                    </div>
                    <div className="info-box mt-3 mb-3">
                      <p>
                        <span>Collection Date</span>
                        <br /> {userPackageBooking.booking_date}
                      </p>
                      <p>
                        <span>Collection Time</span>
                        <br /> {userPackageBooking.slot_time}
                      </p>
                      <p>
                        <span>Mobile Number</span>
                        <br />  {userPackageBooking.contact}
                      </p>                 
                    </div>
                    <div>
                    {userPackageBooking.package_name == "" && (
                      <div>
                        {/* <Form.Group className="mb-3">
                          <p className="mb-0">Package</p>
                          <Form.Control
                            type="text"
                            placeholder=""
                            className="page-form-control"
                          />
                        </Form.Group> */}
                        <div>
                          <Form.Group className="mb-3">
                            <p className="mb-0">Booking Date</p>
                            <Form.Control
                              type="date"
                              placeholder=""
                              className="page-form-control"
                              onChange={handleDateChange} // Call handleDateChange on date field change
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <p className="mb-0">Booking Slot</p>
                            <Form.Select name="Slot">
                              <option value="">Select Slot</option>
                              {slots.map((slot, index) => (
                                <option key={index} value={slot}>
                                  {slot}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>  
                        </div>
                        <Form.Group className="mb-3">
                          <Form.Label>Chose Package*</Form.Label>
                          <Form.Select
                            className="page-form-control"
                            value={userPackageBooking.package_name}
                            onChange={(e) => setUserPackageBooking({ ...userPackageBooking, package_name: e.target.value })}
                          >
                            <option>Select Package</option>
                            {/* Map over labPackages to generate options */}
                            {labPackages.map((labPackage) => (
                              <option key={labPackage.lab_package_id} value={labPackage.package_name}>
                                {labPackage.lab_package_name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <p className="mb-0">Selected Package(s)</p>                                              
                      </div>
                    )}
                     <div className="text-center">
                      <Link href={ `package-attachment-details?id=${userPackageBooking.id}`} className="text-danger">
                        Tube Details
                      </Link>
                    </div>
                    </div>
                   
                    
                    <div>
                      {userPackageBooking.package_name != "" && (
                        <div className="selected-packages mb-3">
                          <p className="text-secondary mb-2">
                            <small>{userPackageBooking.package_name}</small>
                          </p>
                          <p className="mb-0">{userPackageBooking.package_price}</p>
                          <button
                            onClick={removePackage}
                            className="delete-btn btn btn-danger"
                          >
                            <HiOutlineMinusSm />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* <div className="text-center">
                      <Link href={"#"} className="text-danger">
                        Tube Details
                      </Link>
                    </div> */}
                  </Form>
                </div>
              </div>
              <div className="web-box">
                <h2 className="box-heading">Order Summary</h2>
                <div className="box-body">
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Price</td>
                        <th>{userPackageBooking.package_mrp}</th>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <th>-{priceDifference}</th>
                      </tr>
                      <tr>
                        <td>Price After Discount</td>
                        <th>{userPackageBooking.package_price}</th>
                      </tr>
                      <tr>
                        <td>Payment Status</td>
                        <th>{camelToTitleCase(userPackageBooking.payment_status)}</th>
                      </tr>
                    </tbody>
                  </Table>
                  {/* <Link href={"#"} className="btn web-stroke-btn w-100">
                    <FaPlus />
                    Select Coupon
                  </Link> */}
                </div>
              </div>              
              <Link href={"#"} className="btn web-stroke-btn mb-3 d-block" onClick={handleSubmit}>
                Update Booking Details
              </Link>

              <Link href={"step3"} className="btn web-btn w-100">
                Next
              </Link>
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
