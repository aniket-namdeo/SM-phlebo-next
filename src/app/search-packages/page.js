"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { MdQrCodeScanner } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "/public/css/search-packages.css";
import PageHeader from "../component/page-header";

export default function searchpackages() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <PageHeader heading="Search Packages" />
      <section className="search-packages section-padding">
        <Container>
          <Row>
            <Col>
              <div className="web-box">
                <div className="box-body">
                  <h2>Thrombophilia Profile - Platinum,</h2>
                  <p>Inclusions</p>
                  <p className="text-grey">
                    Lorem ipsum is a simply dummy text. Lorem ipsum is a simply
                    dummy text.
                  </p>
                  <hr />
                  <p className="price web-clr">
                    <del className="text-grey">Rs. 32000</del> Rs. 21500/-
                  </p>
                </div>
              </div>

              <div className="web-box">
                <div className="box-body">
                  <h2>Thrombophilia Profile - Platinum,</h2>
                  <p>Inclusions</p>
                  <p className="text-grey">
                    Lorem ipsum is a simply dummy text. Lorem ipsum is a simply
                    dummy text.
                  </p>
                  <hr />
                  <p className="price web-clr">
                    <del className="text-grey">Rs. 32000</del> Rs. 21500/-
                  </p>
                </div>
              </div>

              <div className="web-box">
                <div className="box-body">
                  <h2>Thrombophilia Profile - Platinum,</h2>
                  <p>Inclusions</p>
                  <p className="text-grey">
                    Lorem ipsum is a simply dummy text. Lorem ipsum is a simply
                    dummy text.
                  </p>
                  <hr />
                  <p className="price web-clr">
                    <del className="text-grey">Rs. 32000</del> Rs. 21500/-
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
