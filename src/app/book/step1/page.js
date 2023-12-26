"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import "/public/css/login.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";

export default function BookStep1() {
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
    setBtnSubmit(true);
    const mobileNum = mobile.value;
    router.push('/book/step2?mobileNo='+mobileNum);
  };

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
                <h2 className="heading">User's Mobile Number</h2>
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
                        Next
                      </Button>
                    ) : (
                      <Button className="btn web-btn" disabled>
                        Next
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
