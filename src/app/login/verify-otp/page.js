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

  const [otp, setOtp] = useState({ value: '', errText: '' });
  const [tmpUser, setTmpUser] = useState('');

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

  const router = useRouter();

  const handleMobileChange = (e) => {
      if (e.target.value.length == 6) {
          setOtp({
              value: e.target.value,
              errText: ''
          });
      } else {
          setOtp({
              value: e.target.value,
              errText: 'Please enter 10 digits of mobile no.'
          });
      }
  }

  const handleVerify = async () => {
    alert(otp.value);
    if (tmpUser.temp_user_otp == otp.value) {
      router.push("/pending-booking");
    }else{
      setSnack({
          open: true,
          message: 'Inavlid OTP, Please try again.'
      });
      setOtp(0);
    }
  }
  
  useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
          const tmpU = JSON.parse(localStorage.getItem("app_user_temp"));
          setTmpUser(tmpU);
      }
  }, []);

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
                    <Form.Control 
                    type="text" 
                    placeholder="otp" 
                    value={otp.value}  
                    onChange={(e) => handleMobileChange(e)} 
                    helperText={otp.errText}
                     />
                  </Form.Group>                  
                  <div className="text-center">
                    <Button className="btn web-btn" onClick={handleVerify}>Submit</Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
          <Snackbar
              open={snack.open}
              autoHideDuration={6000}
              onClose={snackClose}
              message={snack.message}
          />
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
