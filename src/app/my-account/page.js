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


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LabPackageBooking } from '@/api_calls/LabPackageBooking';
import { PhelboDetails } from '@/api_calls/PhelboDetails';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';


export default function myaccount() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await PhelboDetails();
        setUserDetails(res);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleLogoutClick = (e) => {
    e.preventDefault(); 
    // Remove the item from localStorage
    localStorage.removeItem("app_user_temp");
    localStorage.removeItem("app_user");
    router.push('/login');

  };
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
                    <h1 className="heading">{userDetails.user_name}</h1>
                    <p className="mb-0" style={{ wordBreak: 'break-all' }}>{userDetails.user_email}</p>
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
                      <span>{userDetails.user_contact}</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"#"}>
                      <div className="icon-name">
                        <LuFileInput />
                        Logged In
                      </div>
                      {/* <span>05:48 AM</span> */}
                    </Link>
                  </li>
                  <li>
                    <Link href={"dashboard"}>
                      <div className="icon-name">
                        <FaRegUser />
                        Phlebo Dashboard
                      </div>
                      <FaAngleRight className="web-clr" />
                    </Link>
                  </li>
                  {/* <li>
                    <Link href={"#"}>
                      <div className="icon-name">
                        <GrLocation />
                        Airtel Cash Drop
                      </div>
                      <FaAngleRight className="web-clr" />
                    </Link>
                  </li> */}
                </ul>
              </div>
              <button  className="btn web-btn w-100" onClick={handleLogoutClick}>
                Logout
              </button>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer page="account" />
    </>
  );
}
