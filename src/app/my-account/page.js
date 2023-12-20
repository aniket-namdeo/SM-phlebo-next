"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import { FaMobileAlt } from "react-icons/fa";
import { LuFileOutput } from "react-icons/lu";
import { LuFileInput } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa";
import "/public/css/myaccount.css";
import Sidebar from "../component/sidebar";
import PageHeader from "../component/page-header";
import Footer from "../component/footer";

export default function myaccount() {
  return (
    <>
      <Sidebar />
      <PageHeader heading="My Account" />
      <section className="myaccount section-padding">
        <Container>
          <Row>
            <Col>
              <div className="web-box user-info">
                <div className="box-body d-flex align-items-center">
                  <Image
                    src="/images/logo-icon.png"
                    width={50}
                    height={50}
                    alt="Phlebo"
                    className="logo"
                  />
                  <div>
                    <h1 className="heading">User Name</h1>
                    <p className="mb-0">username@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="web-box">
                <ul>
                  <li>
                    <Link href={"#"}>
                      <div className="icon-name">
                        <FaMobileAlt />
                        Mobile
                      </div>
                      <span>01234567890</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"#"}>
                      <div className="icon-name">
                        <LuFileInput />
                        Punch In Time
                      </div>
                      <span>05:48 AM</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"#"}>
                      <div className="icon-name">
                        <LuFileOutput />
                        Punch Out Time
                      </div>
                      <FaAngleRight className="web-clr" />
                    </Link>
                  </li>
                  <li>
                    <Link href={"#"}>
                      <div className="icon-name">
                        <FaRegUser />
                        Phlebo Dashboard
                      </div>
                      <FaAngleRight className="web-clr" />
                    </Link>
                  </li>
                  <li>
                    <Link href={"#"}>
                      <div className="icon-name">
                        <GrLocation />
                        Airtel Cash Drop
                      </div>
                      <FaAngleRight className="web-clr" />
                    </Link>
                  </li>
                </ul>
              </div>
              <Link href={"#"} className="btn web-btn w-100">
                Logout
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <Link href={"#"} className="create-plus-btn btn web-btn">
        <FaUserPlus />
      </Link>
      <Footer page="account" />
    </>
  );
}
