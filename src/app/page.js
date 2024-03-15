"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Image from "next/image";
import "/public/css/login.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SendOTP } from "@/api_calls/SendOtp";
import { useSearchParams } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mobile, setMobile] = useState({ value: "", errText: "" });
  const [showLoginBtn, setShowLoginBtn] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
  });
  const snackClose = () => {
    setSnack({
      open: false,
      message: "",
    });
  };

  const [btnSubmit, setBtnSubmit] = useState(false);
  const handleMobileChange = (e) => {
    if (e.target.value.length == 10) {
      setShowLoginBtn(true);
      setMobile({
        value: e.target.value,
        errText: "",
      });
    } else {
      setShowLoginBtn(false);
      setMobile({
        value: e.target.value,
        errText: "Please enter 10 digits of mobile no.",
      });
    }
  };

  const handleConfirm = async () => {
    setShowLoginBtn(true);
    const guest = {
      user_id: 0,
      name: "Guest",
      mobile_no: mobile.value,
      otp_verify: false,
    };
    localStorage.setItem("app_user", JSON.stringify(guest));
    const otpAPI = await SendOTP(mobile.value); // Send OTP API Call
    if (otpAPI.status == 1) {
      router.push("/login/verify-otp");
    } else {
      setBtnSubmit(false);
      console.log(otpAPI);
      const msg = "Invalid Contact Number";
      setSnack({
        open: true,
        message: msg,
      });
    }
  };

  return (
    <>
      <section className="login">
        <Image
          src="/images/lab-test.webp"
          width={700}
          height={467}
          alt="Phlebo"
          className="login-img"
        />
        <Image
          src="/images/labtest.png"
          width={98}
          height={419}
          alt="Phlebo"
          className="labtest-tube"
        />
        <Container>
          <Row>
            <Col>
              <Image
                src="/images/logo-icon.png"
                width={70}
                height={60}
                alt="Phlebo"
                className="logo"
              />
              <h1 className="heading web-clr">Welcome Phlebotomist</h1>
              <p>Login to your account</p>
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
                  {showLoginBtn ? (
                    <Button className="btn web-btn" onClick={handleConfirm}>
                      Log In
                    </Button>
                  ) : (
                    <Button className="btn web-btn" disabled>
                      Log In
                    </Button>
                  )}
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
      </section>
    </>
  );
}
