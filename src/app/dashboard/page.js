"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import "/public/css/dashboard.css";
import PageHeader from "../component/page-header";
import Footer from "../component/footer";
import Sidebar from "../component/sidebar";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardCount } from '@/api_calls/DashboardCount';
import { FaUserPlus } from "react-icons/fa";

export default function updatebooking() {

  const [dashboardCounts, setDashboardCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DashboardCount();
        setDashboardCounts(data.counts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    // "month_assignments": 7,
    // "today_assignments": 0,
    // "month_pending": 7,
    // "today_pending": 0,
    // "month_hold": 0,
    // "today_hold": 0,
    // "month_confirmed": 0,
    // "today_confirmed": 0,
    // "month_canceled": 0,
    // "today_canceled": 0
    <>
      <Sidebar />
      <PageHeader heading="Phlebo Dashboard" />
      <section className="dashboard section-padding">
        <Container>
          <Row>
            <Col className="col-6">
              <Link href={"#"} className="dash-box">
                <div className="box-body">
                  <h2 className="number">{dashboardCounts.today_assignments}</h2>
                  <p>Assigned Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Month - {dashboardCounts.month_assignments}</p>
                </div>
              </Link>
            </Col>
            <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">{dashboardCounts.today_confirmed}</h2>
                  <p>Confirmed Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Month - {dashboardCounts.month_confirmed}</p>
                </div>
              </div>
            </Col>
            <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">{dashboardCounts.today_hold}</h2>
                  <p>Hold Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Month - {dashboardCounts.month_hold}</p>
                </div>
              </div>
            </Col>
            <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">{dashboardCounts.today_pending}</h2>
                  <p>Pending Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Month - {dashboardCounts.month_pending}</p>
                </div>
              </div>
            </Col>
             {/* <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">0</h2>
                  <p>Add on Amount</p>
                </div>
                <div className="box-footer">
                  <p>Today - 4300</p>
                </div>
              </div>
            </Col>
            <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">1</h2>
                  <p>New Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Month - 02</p>
                </div>
              </div>
            </Col>
            <Col className="col-12">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">4350</h2>
                  <p>Cash Collect</p>
                </div>
                <div className="box-footer">
                  <p>Today - 4350</p>
                </div>
              </div>
            </Col> */}
            <Col className="col-12">
              <div className="dash-box total">
                <div className="box-body">
                  <h2 className="number">&#8377; {dashboardCounts.month_cash_collected}</h2>
                  <p>Total Cash Collect</p>
                </div>
              </div>
            </Col>
            <Col className="col-12">
              <p className="mt-2 mb-0 text-center">
                <span className="web-clr">Note:</span> Dashboard will be updated
                in every 30 minutes.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
