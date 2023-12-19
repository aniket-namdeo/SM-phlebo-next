"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Image from "next/image";
import "/public/css/login.css";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SendOTP } from '@/api_calls/SendOtp';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';

export default function Login() {

  const router = useRouter();

  const handleVerify = async () => {
    router.push("/pending-booking");
  }

  return (
    <>
      <section className="login">
        <div className="box">
          <Container>
            <Row>
              <Col>
                <Image
                  src="/images/logo-icon.png"
                  width={70}
                  height={70}
                  alt="Phlebo"
                  className="logo"
                />
                <h1 className="heading">OTP</h1>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="otp" />
                  </Form.Group>                  
                  <div className="text-center">
                    <Button className="btn web-btn" onClick={handleVerify}>Submit</Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="login-footer text-center">
          <p className="m-0">
            {/* Don't have an account? <Link href={"#"}>Sign Up</Link> */}
            SecondMedic Phlebo
          </p>
        </div>
      </section>
    </>
  );
}
