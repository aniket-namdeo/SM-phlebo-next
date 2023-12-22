"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RiMenu3Line } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import "/public/css/sidebar.css";

export default function Sidebar(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button onClick={handleShow} className="sidebar-btn">
        <RiMenu3Line />
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Phlebo Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <li className={props.page == "allbooking" && "active"}>
              <Link href={"#"}>
                All Bookings
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "containerdelivery" && "active"}>
              <Link href={"#"}>
                Container Delivery
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "samplehandover" && "active"}>
              <Link href="#">
                Sample Handover
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "campbooking" && "active"}>
              <Link href="#">
                Camp Booking
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "handoveredbookings" && "active"}>
              <Link href="#">
                Handovered Bookings
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "multibookingcashreceipt" && "active"}>
              <Link href="#">
                Multi Booking Cash Receipt
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "paycashbookings" && "active"}>
              <Link href="#">
                Pay Cash Bookings
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "leads" && "active"}>
              <Link href="#">
                Leads
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "inventorymodule" && "active"}>
              <Link href="#">
                Inventory Module
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li
              className={
                props.page == "courierhandoveredbookinglist" && "active"
              }
            >
              <Link href="#">
                Courier Handovered Booking List
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "searchpackages" && "active"}>
              <Link href="#">
                Search Packages
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
            <li className={props.page == "helpdesk" && "active"}>
              <Link href="#">
                Help Desk
                <FaAngleRight className="web-clr" />
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
