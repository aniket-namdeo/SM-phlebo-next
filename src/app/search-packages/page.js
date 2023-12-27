"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { MdQrCodeScanner } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "/public/css/search-packages.css";
import PageHeader from "../component/page-header";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LabPackageBookingDetails } from '@/api_calls/LabPackageBookingDetails';
import { UpdateBookingMemberDetails } from '@/api_calls/UpdateBookingMemberDetails';
import { LabPackages } from '@/api_calls/LabPackages';
import { ThyrocareSlot } from '@/api_calls/ThyrocareSlot';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import BookingList from '@/components/BookingList';

export default function searchpackages() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [labPackages, setLabPackages] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPackages, setFilteredPackages] = useState(labPackages);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log()
    const filtered = labPackages.filter((labPackage) =>
      labPackage.lab_package_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPackages(filtered);
  };

  useEffect(() => {
    const id = searchParams.get('id');
    async function fetchData() {
      try {       
        const lab_res = await LabPackages();
        setLabPackages(lab_res);
        setFilteredPackages(lab_res);
         
      } catch (error) {
        console.error(error);
      }

      
    }

    fetchData();
  }, []);
  return (
    <>
      <PageHeader heading="Search Packages" />
      <section className="search-packages section-padding">
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search Packages"
                  className="page-form-control"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </Form.Group>
           
                {filteredPackages.map((labPackage) => (
                  <div key={labPackage.lab_package_id} value={labPackage.lab_package_id} className="web-box">
                    <div className="box-body">
                      <h2>{labPackage.lab_package_name}</h2>
                      <p>{labPackage.lab_name}</p>
                      <p className="text-grey">
                        {labPackage.package_short_description}
                      </p>
                      <hr />
                      <p className="price web-clr">
                        <del className="text-grey">Rs. {labPackage.package_mrp}</del> Rs. {labPackage.package_price}/-
                      </p>
                    </div>
                  </div>
                ))}

            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
