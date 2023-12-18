"use client";
import Link from "next/link";
import { MdOutlinePending } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

export default function Footer(props) {
  return (
    <>
      <section className="footer">
        <ul>
          <li className={props.page == "pending" && "active"}>
            <Link href={"pending-booking"}>
              <MdOutlinePending /> <br />
              <span>Pending</span>
            </Link>
          </li>
          <li className={props.page == "confirmed" && "active"}>
            <Link href={"confirmed-booking"}>
              <IoShieldCheckmarkOutline /> <br />
              <span>Confirmed</span>
            </Link>
          </li>
          <li className={props.page == "cancelled" && "active"}>
            <Link href={"cancelled-booking"}>
              <RxCrossCircled /> <br />
              <span>Cancelled</span>
            </Link>
          </li>
          <li className={props.page == "hold" && "active"}>
            <Link href={"hold-booking"}>
              <AiOutlineInfoCircle /> <br />
              <span>Hold</span>
            </Link>
          </li>
          <li className={props.page == "account" && "active"}>
            <Link href={"#"}>
              <AiOutlineUser /> <br />
              <span>My Account</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
