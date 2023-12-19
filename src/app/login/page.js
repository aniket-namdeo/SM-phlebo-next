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

  const searchParams = useSearchParams();
  const router = useRouter();
  const [mobile, setMobile] = useState({ value: '', errText: '' });
  const [showLoginBtn, setShowLoginBtn] = useState(false);
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

  const [btnSubmit, setBtnSubmit] = useState(false);
  const handleMobileChange = (e) => {
      if (e.target.value.length == 10) {
          setShowLoginBtn(true);
          setMobile({
              value: e.target.value,
              errText: ''
          });
      } else {
          setShowLoginBtn(false);
          setMobile({
              value: e.target.value,
              errText: 'Please enter 10 digits of mobile no.'
          });
      }
  }

  const handleConfirm = async () => {
      setBtnSubmit(true);
      const guest = {
          user_id: 0,
          name: "Guest",
          mobile_no: mobile,
          otp_verify: false
      }
      localStorage.setItem("app_user", JSON.stringify(guest));
      const otpAPI = await SendOTP(mobile.value); // Send OTP API Call
      if (otpAPI.status == 1) {
          router.push("/login/verify-otp");
      } else {
          setBtnSubmit(false);
          const msg = otpAPI.msg;
          setSnack({
              open: true,
              message: msg
          });
      }
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
                <h1 className="heading">Log In</h1>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control 
                      type="text" 
                      placeholder="Mobile" 
                      value={mobile.value}  
                      onChange={(e) => handleMobileChange(e)} 
                      helperText={mobile.errText}
                    />
                  </Form.Group>                  
                  <div className="text-center">
                  {
                    showLoginBtn ?
                    <Button className="btn web-btn" onClick={handleConfirm}>Log In</Button>
                    :
                    <Button className="btn web-btn" disabled>Log In</Button>
                  }
                  </div>
                </Form>
                <div className="login-with">
                  <p>Log In with</p>
                  <ul>
                    {/* <li>
                      <Link href={"#"}>
                        <Image
                          src="/images/facebook-icon.svg"
                          width={40}
                          height={40}
                          alt=""
                        />
                      </Link>
                    </li> */}
                    <li>
                      <Link href={"#"}>
                        <Image
                          src="/images/google-icon.svg"
                          width={40}
                          height={40}
                          alt=""
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
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
          </p>
        </div>
      </section>
    </>
  );
}
