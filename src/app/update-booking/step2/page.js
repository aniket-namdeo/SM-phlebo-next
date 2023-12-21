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
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import BookingList from '@/components/BookingList';

export default function step2() {

  const searchParams = useSearchParams();
  const [userPackageBooking, setUserPackageBooking] = useState({});

  useEffect(() => {
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
                  <Form>
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
                    <Form.Group className="mb-3">
                      <p className="mb-0">Package</p>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="page-form-control"
                      />
                    </Form.Group>

                    <p className="mb-0">Selected Package(s)</p>
                    <div className="text-right mb-3">
                      <Link href={"#"}>Edit Packages</Link>
                    </div>
                    <div className="selected-packages mb-3">
                      <p className="text-secondary mb-2">
                        <small>
                          Advance Plus Full Body Checkup(Within 15 Hrs)
                        </small>
                      </p>
                      <p className="mb-0">2099</p>
                      <Link href={"#"} className="delete-btn btn btn-danger">
                        <HiOutlineMinusSm />
                      </Link>
                    </div>
                    <div className="selected-packages mb-3">
                      <p className="text-secondary mb-2">
                        <small>
                          Advance Plus Full Body Checkup(Within 15 Hrs)
                        </small>
                      </p>
                      <p className="mb-0">2099</p>
                      <Link href={"#"} className="delete-btn btn btn-danger">
                        <HiOutlineMinusSm />
                      </Link>
                    </div>

                    <div className="text-center">
                      <Link href={"#"} className="text-danger">
                        Tube Details
                      </Link>
                    </div>
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
                        <th>2099</th>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <th>-189</th>
                      </tr>
                      <tr>
                        <td>VIP Membership Discount</td>
                        <th>-210.00</th>
                      </tr>
                      <tr>
                        <td>Price After Discount</td>
                        <th>1700</th>
                      </tr>
                      <tr>
                        <td>Amount to be taken from customer</td>
                        <th>Already Paid</th>
                      </tr>
                    </tbody>
                  </Table>
                  <Link href={"#"} className="btn web-stroke-btn w-100">
                    <FaPlus />
                    Select Coupon
                  </Link>
                </div>
              </div>
              <Link href={"step3"} className="btn web-btn w-100">
                Next
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
