import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableComponent from "./TableComponent";
import { pdfjs } from "react-pdf";
import {
  ArrowRightCircleFill,
  ArrowLeftCircleFill,
} from "react-bootstrap-icons";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Scrollbars } from 'react-custom-scrollbars-2';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const PDFTableComponent = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [invoiceNum, setInvoiceNum] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [vendorName, setvendorName] = useState("");
  const [invoiceBalance, setInvoiceBalance] = useState("");
  const [invoiceTotal, setInvoiceTotal] = useState("");
  const [invoicePaymentTerms, setInvoicePaymentTerms] = useState("");
  const [invoiceRemitTo, setInvoiceRemitTo] = useState("");
  const [invoiceRoute, setInvoiceRoute] = useState("");
  const [invoiceShipTo, setInvoiceShipTo] = useState("");
  const [invoiceBillTo, setInvoiceBillTo] = useState("");
  const [invoiceGlobalAddresses, setInvoiceGlobalAddresses] = useState("");
  const [invoiceSoldTo, setInvoiceSoldTo] = useState("");
  const [totalPagesRcvd, setTotalPagesRcvd] = useState("");
  const [totalPagesInInvoice, setTotalPagesInInvoice] = useState("");
  const [totalPagesInInvoiceFromGlobal, setTotalPagesInInvoiceFromGlobal] =
    useState("");
  const [vendorNamesSource, setvendorNamesSource] = useState("");
  const [totalPagesProcessed, setTotalPagesProcessed] = useState("");
  const [humanVerificationReqd, setHumanVerificationReqd] = useState("");
  const [invoiceTotalFromtable, setInvoiceTotalFromtable] = useState("");
  const [invoiceDiscount, setInvoiceDiscount] = useState("");
  const [invoiceTaxes, setInvoiceTaxes] = useState([]);
  const [failedReasons, setFailedReasons] = useState([]);
  const [verdict, setVerdict] = useState("");
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [newPage, setNewpage] = useState(0);
  const [tempValue, setTempValue] = useState(1);
  const [invoiceTableData, setInvoiceTableData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [invoiceNumArray, setInvoiceNumArray] = useState([]);
  const [searchResultVisible, setSearchResutsVisible] = useState(false)

  useEffect(() => {
    if (pageNumber === 0) {
      return;
    }
    setLoading(true);
    const apiUrl = `${process.env.REACT_APP_INVOICE_URL}/${pageNumber}`;
    axios
      .get(apiUrl)
      .then((response) => {
        // Get data for table
        const data = response.data.response.invoice;
        if (Object.keys(data).length === 0) {
          setTableData([]);
          setLoading(false);
          setTotalInvoices(response.data.response.total_invoices);
          setPdfUrl(response.data.response.pdf_link);
          setInvoiceNum(response.data.response.invoice_number);
          return;
        }

        const keys = Object.keys(data);
        const tableData = [];

        for (let i = 0; i < Object.values(data[keys[0]]).length; i++) {
          const obj = {};
          for (const key of keys) {
            obj[key] = data[key][i];
          }
          tableData.push(obj);
        }

        setTableData(tableData);

        // Get data for invoice table
        const data0 = response.data.response.invoice_1;
        if (Object.keys(data0).length === 0) {
          setInvoiceTableData([]);
          setLoading(false);
          setTotalInvoices(response.data.response.total_invoices);
          setPdfUrl(response.data.response.pdf_link);
          setInvoiceNum(response.data.response.invoice_number);
          return;
        }

        const keys0 = Object.keys(data0);
        const invoicetableData = [];

        for (let i = 0; i < Object.values(data0[keys0[0]]).length; i++) {
          const obj = {};
          for (const key of keys0) {
            obj[key] = data0[key][i];
          }
          invoicetableData.push(obj);
        }
        setInvoiceTableData(invoicetableData);

        setPdfUrl(response.data.response.pdf_link);
        setInvoiceNum(response.data.response.invoice_number);
        setInvoiceDate(response.data.response.invoice_date);
        setvendorName(response.data.response.vendor_names);
        setTotalInvoices(response.data.response.total_invoices);
        setdueDate(response.data.response.invoice_due_date);
        setInvoiceBalance(response.data.response.invoice_balance_due);
        setInvoiceTotal(response.data.response.invoice_total_amount);
        setInvoicePaymentTerms(response.data.response.invoice_payment_terms);
        setInvoiceRemitTo(response.data.response.invoice_remit_to);
        setInvoiceRoute(response.data.response.invoice_route);
        setInvoiceShipTo(response.data.response.invoice_ship_to);
        setInvoiceBillTo(response.data.response.invoice_bill_to);
        setInvoiceGlobalAddresses(
          response.data.response.invoice_global_addresses
        );
        setInvoiceSoldTo(response.data.response.invoice_sold_to);
        setTotalPagesRcvd(
          response.data.response.total_number_of_pages_received
        );
        setTotalPagesInInvoice(response.data.response.total_pages_in_invoice);
        setTotalPagesInInvoiceFromGlobal(
          response.data.response.total_pages_in_invoice_from_global
        );
        setvendorNamesSource(response.data.response.vendor_names_source);
        setTotalPagesProcessed(
          response.data.response.total_number_of_pages_processed
        );
        setHumanVerificationReqd(
          response.data.response.human_verification_required
        );
        setInvoiceTotalFromtable(
          response.data.response.invoice_total_from_table
        );
        setInvoiceDiscount(response.data.response.invoice_discount);
        setInvoiceTaxes(response.data.response.invoice_taxes);
        setVerdict(response.data.response.verdict);
        setFailedReasons(response.data.response.failed_reasons);
        setConcerns(response.data.response.concerns);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [pageNumber]);

  const handleInputChange = (e) => {
    const newValue = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    setTempValue(parseInt(newValue));
  };

  const handleBlur = () => {
    setPageNumber(tempValue);
  };

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };
  const handleBlurSearch = () =>{
    setInvoiceNumArray([])
  }
  useEffect(() => {
    console.log("the url is");
    const payload = {
      invoice_name: searchInput,
    };
    if (searchInput != "") {
      const apiUrl = `${process.env.REACT_APP_SEARCH_URL}`;
      axios
        .post(apiUrl, payload)
        .then((response) => {
          console.log(response.data.matching_invoice_numbers);
          setSearchResutsVisible(true)
          setInvoiceNumArray(response.data.matching_invoice_numbers);
        })
        .catch((error) => {
          console.log("the error is", error);
        });
    }
    else{
      setInvoiceNumArray([]);
    }
  }, [searchInput]);
  return (
    <Container className="mt-4">
      {loading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={[
            "#F57E37",
            "#1BBEE9",
            "#F57E37",
            "#1BBEE9",
            "#F57E37",
            "#1BBEE9",
          ]}
        />
      ) : (
        <>
        <Row>
          <Col md={6}>
            <div className="col-md-8 mb-4">
              <div className="input-group" style={{width:"500px"}}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Invoice"
                  aria-label="Search Invoice"
                  aria-describedby="basic-addon1"
                  onChange={handleSearchInputChange}
                  // onBlur={handleBlurSearch}
                  value={searchInput}
                />
                <span className="input-group-text" id="basic-addon1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                  </svg>
                </span>
              </div>
              {invoiceNumArray.length>0 && searchResultVisible ? (
                <Scrollbars id="suggestions" style={{width:"500px", position: "absolute", zIndex: 1, background: "white", border: "1px solid #ccc", borderRadius: "8px", maxHeight: "150px", scrollbarWidth: "thin", scrollbarColor: "#FDFFD0", paddingRight: "12px",}}>
                  <div style={{height: "30px"}} >Matching Invoice Numbers</div>
                  <hr className="featurette-divider mt-0 mb-0"></hr>
                {invoiceNumArray.map((number) => (
                  <>
                  <div style={{height: "30px"}} key={number} onClick={()=>
                    {
                      setPageNumber(number)
                      setTempValue(number)
                      setSearchResutsVisible(false)
                    }}>
                      Invoice Number: {number}</div>
                  <hr className="featurette-divider mt-0 mb-0"></hr>
                  </>
                ))}
              </Scrollbars>
              ):null}
              
            </div>
            <div
              style={{
                height: "530px",
              }}
            >
              <iframe
                title="pdf"
                src={pdfUrl}
                width="100%"
                height="530"
                frameborder="0"
                allow="autoplay"
              ></iframe>
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-4" style={{ height: "530px" }}>
              <TableComponent
                data={tableData}
                invoiceTableData={invoiceTableData}
                invoiceBalance={invoiceBalance}
                invoiceDate={invoiceDate}
                invoiceNum={invoiceNum}
                invoicePaymentTerms={invoicePaymentTerms}
                invoiceBillTo={invoiceBillTo}
                invoiceShipTo={invoiceShipTo}
                invoiceRoute={invoiceRoute}
                dueDate={dueDate}
                invoiceTotal={invoiceTotal}
                invoiceRemitTo={invoiceRemitTo}
                invoiceGlobalAddresses={invoiceGlobalAddresses}
                invoiceSoldTo={invoiceSoldTo}
                totalPagesRcvd={totalPagesRcvd}
                totalPagesInInvoice={totalPagesInInvoice}
                totalPagesInInvoiceFromGlobal={totalPagesInInvoiceFromGlobal}
                vendorName={vendorName}
                vendorNamesSource={vendorNamesSource}
                totalPagesProcessed={totalPagesProcessed}
                humanVerificationReqd={humanVerificationReqd}
                invoiceTotalFromtable={invoiceTotalFromtable}
                invoiceDiscount={invoiceDiscount}
                invoiceTaxes={invoiceTaxes}
                verdict={verdict}
                failedReasons={failedReasons}
                concerns={concerns}
              />
            </div>
            <span className="my-4 mx-2">
              <ArrowLeftCircleFill
                onClick={() => {
                  setPageNumber(tempValue - 1);
                  setTempValue(tempValue - 1);
                }}
                size={40}
              />
            </span>
            <span className="my-4 mx-2">
              <input
                value={tempValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="btn btn-secondary"
                style={{ width: "50px" }}
              />
              <span className="my-4">
                {" "}
                <strong>/</strong>{" "}
                <input
                  value={`${totalInvoices}`}
                  className="btn btn-secondary"
                  style={{ width: "50px", cursor: "default" }}
                />
              </span>
            </span>
            <span className="my-4 mx-2">
              <ArrowRightCircleFill
                onClick={() => {
                  setPageNumber(tempValue + 1);
                  setTempValue(tempValue + 1);
                }}
                size={40}
              />
            </span>
          </Col>
        </Row>
        </>
      )}
    </Container>
  );
};

export default PDFTableComponent;
