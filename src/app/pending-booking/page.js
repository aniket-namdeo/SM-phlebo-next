"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import "/public/css/pending-booking.css";
import PageHeader from "../component/page-header";
import Footer from "../component/footer";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LabPackageBooking } from '@/api_calls/LabPackageBooking';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import BookingList from '@/components/BookingList';
import { FaUserPlus } from "react-icons/fa";
import Sidebar from "../component/sidebar";

const PendingBookingPage = () => {
  const [userPackageBooking, setUserPackageBooking] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await LabPackageBooking('pending');
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
     <Sidebar />
      <PageHeader heading="Pending Bookings" />
      <section className="pending-booking section-padding">
        <Container>
          <Col>
            <BookingList bookings={userPackageBooking} />
          </Col>
        </Container>
      </section>
      <Link href={"/book/step1"} className="create-plus-btn btn web-btn">
        <FaUserPlus />
      </Link>
      <Footer page="pending" />
    </>
  );
}

export default PendingBookingPage;
