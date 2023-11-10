import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import TableComponent from "./TableComponent";
import { pdfjs } from "react-pdf";
import {
  ArrowRightCircleFill,
  ArrowLeftCircleFill,
} from "react-bootstrap-icons";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars-2";
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
  // const [newPage, setNewpage] = useState(0);
  const [tempValue, setTempValue] = useState(1);
  const [invoiceTableData, setInvoiceTableData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [invoiceNumArray, setInvoiceNumArray] = useState([]);
  const [searchResultVisible, setSearchResutsVisible] = useState(false);
  const [extraChargesAdded, setExtraChargesAdded] = useState([]);
  const [extraDiscountsAdded, setExtraDiscountsAdded] = useState([]);
  const [respData, setRespData] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filterOptions = [
    "All",
    "Human Verification Required",
    "Human Verification Not Required",
  ];
  const [additionalCols, setAdditionalCols] = useState([]);
  const [tableSpecificAddCols, setTableSpecificAddCols] = useState([]);
  const [additionalHeaders, setAdditionalHeaders] = useState([]);
  const [numberOfRows, setNumberOfRows] = useState({});
  const [additionalColsTables, setAdditionalColsTables] = useState([]);
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

        // Get data for additional table
        const data1 =
          response.data.response.additional_columns[
            "combined_additional_columns"
          ];
        if (data1 && Object.keys(data1).length === 0) {
          setAdditionalCols([]);
          setLoading(false);
          return;
        }
        if (data1 && Object.keys(data1).length > 0) {
          const keys1 = Object.keys(data1);
          const additionaltableData = [];

          for (let i = 0; i < Object.values(data1[keys1[0]]).length; i++) {
            const obj = {};
            for (const key of keys1) {
              obj[key] = data1[key][i];
            }
            additionaltableData.push(obj);
          }
          setAdditionalCols(additionaltableData);
        } else {
          setAdditionalCols([]);
        }

        setAdditionalColsTables(
          response.data.response.additional_columns[
            "table_specific_additional_columns"
          ]
        );
        setPdfUrl(response.data.response.pdf_link);
        setInvoiceNum(response.data.response.invoice_metadata.invoice_number);
        setInvoiceDate(response.data.response.invoice_metadata.invoice_date);
        setvendorName(response.data.response.invoice_metadata.vendor_names);
        setTotalInvoices(response.data.response.total_invoices);
        setdueDate(response.data.response.invoice_metadata.invoice_due_date);
        setInvoiceBalance(
          response.data.response.invoice_metadata.invoice_balance_due
        );
        setInvoiceTotal(
          response.data.response.invoice_metadata.invoice_total_amount
        );
        setInvoicePaymentTerms(
          response.data.response.invoice_metadata.invoice_payment_terms
        );
        setInvoiceRemitTo(
          response.data.response.invoice_metadata.invoice_remit_to
        );
        setInvoiceRoute(response.data.response.invoice_metadata.invoice_route);
        setInvoiceShipTo(
          response.data.response.invoice_metadata.invoice_ship_to
        );
        setInvoiceBillTo(
          response.data.response.invoice_metadata.invoice_bill_to
        );
        setInvoiceGlobalAddresses(
          response.data.response.invoice_metadata.invoice_global_addresses
        );
        setInvoiceSoldTo(
          response.data.response.invoice_metadata.invoice_sold_to
        );
        setTotalPagesRcvd(
          response.data.response.invoice_metadata.total_number_of_pages_received
        );
        setTotalPagesInInvoice(
          response.data.response.invoice_metadata.total_pages_in_invoice
        );
        setTotalPagesInInvoiceFromGlobal(
          response.data.response.invoice_metadata
            .total_pages_in_invoice_from_global
        );
        setvendorNamesSource(
          response.data.response.invoice_metadata.vendor_names_source
        );
        setTotalPagesProcessed(
          response.data.response.invoice_metadata
            .total_number_of_pages_processed
        );
        setHumanVerificationReqd(
          response.data.response.human_verification_required
        );
        setInvoiceTotalFromtable(
          response.data.response.invoice_metadata.invoice_total_from_table
        );
        setInvoiceDiscount(
          response.data.response.invoice_metadata.invoice_discount
        );
        setInvoiceTaxes(response.data.response.invoice_metadata.invoice_taxes);
        setVerdict(response.data.response.human_verification_info.verdict);
        setFailedReasons(
          response.data.response.human_verification_info.failed_reasons
        );
        setConcerns(response.data.response.human_verification_info.concerns);
        setExtraChargesAdded(
          response.data.response.invoice_metadata.extra_charges_added
        );
        setExtraDiscountsAdded(
          response.data.response.invoice_metadata.extra_discounts_added
        );
        setRespData(response.data.response);
        setAdditionalHeaders(
          response.data.response.invoice_metadata
            .processed_table_header_candidates
        );
        setNumberOfRows(
          response.data.response.invoice_metadata.number_of_rows_in_tables
        );
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
  // const handleBlurSearch = () => {
  //   setTimeout(() => {
  //     setSearchResutsVisible(false);
  //   }, 100);
  // };
  useEffect(() => {
    console.log("the url is");
    const payload = {
      invoice_name: searchInput,
      filters: {
        human_verification:
          selectedFilter === "All"
            ? "both"
            : selectedFilter === "Human Verification Required"
            ? "true"
            : "false",
      },
    };
    if (searchInput !== "") {
      const apiUrl = `${process.env.REACT_APP_SEARCH_URL}`;
      axios
        .post(apiUrl, payload)
        .then((response) => {
          console.log(response.data.matching_invoice_numbers);
          setSearchResutsVisible(true);
          setInvoiceNumArray(response.data.matching_invoice_numbers);
        })
        .catch((error) => {
          console.log("the error is", error);
        });
    } else {
      setInvoiceNumArray([]);
    }
  }, [searchInput, selectedFilter]);
  return (
    <>
      <nav
        className="navbar p-3 shadow-sm"
        style={{
          backgroundColor: "#FDFFD0",
          position: "fixed",
          top: "0",
          bottom: "100",
          zIndex: "100",
          width: "100%",
        }}
      >
        <div
          className="row"
          style={{
            width: "100%",
          }}
        >
          <div
            className="navbar-brand mb-0 h1 m-auto col-md-6 float-start"
            style={{ fontSize: "1.4em", letterSpacing: "1px" }}
          >
            Invoice Intelligence Platform
          </div>
          <div className="col-md-6 float-end">
            <div className="input-group" style={{ width: "100%" }}>
              <select
                className="form-select"
                onChange={(e) => setSelectedFilter(e.target.value)}
                value={selectedFilter}
              >
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
              {invoiceNumArray.length > 0 && searchResultVisible ? (
                <Scrollbars
                  id="suggestions"
                  style={{
                    width: "100%",
                    maxWidth: "auto",
                    position: "absolute",
                    zIndex: 1,
                    height: "140px",
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    maxHeight: "250px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#FDFFD0",
                    paddingRight: "12px",
                    marginRight: "12px",
                    marginTop: "40px",
                  }}
                >
                  <div style={{ height: "30px" }}>Matching Invoice Numbers</div>
                  <hr className="featurette-divider mt-0 mb-0"></hr>
                  {invoiceNumArray.map((number) => (
                    <>
                      <div
                        style={{ height: "30px", cursor: "pointer" }}
                        key={number}
                        onClick={() => {
                          setPageNumber(number.invoice_number);
                          setTempValue(number.invoice_number);
                          setSearchResutsVisible(false);
                        }}
                        className="d-flex justify-content-between"
                      >
                        <div className="mx-2 text-gray text-sm">
                          Invoice Number: {number.invoice_number}
                        </div>
                        <div
                          className="mx-2 mt-3 text-muted fst-italic"
                          style={{ fontSize: "10px" }}
                        >
                          Score: {number.matching_score}
                        </div>
                      </div>
                      <hr className="featurette-divider mt-0 mb-0"></hr>
                    </>
                  ))}
                </Scrollbars>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
      <div className="mx-5" style={{ marginTop: "135px" }}>
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
                <div
                  style={{
                    height: "580px",
                  }}
                >
                  <iframe
                    title="pdf"
                    src={pdfUrl}
                    width="100%"
                    height="570"
                    allow="autoplay"
                  ></iframe>
                </div>
                <div className="my-4">
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
                    totalPagesInInvoiceFromGlobal={
                      totalPagesInInvoiceFromGlobal
                    }
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
                    extraChargesAdded={extraChargesAdded}
                    extraDiscountsAdded={extraDiscountsAdded}
                    respData={respData}
                    setInvoiceTableData={setInvoiceTableData}
                    additionalCols={additionalCols}
                    setAdditionalCols={setAdditionalCols}
                    additionalHeaders={additionalHeaders}
                    tableSpecificAddCols={tableSpecificAddCols}
                    numberOfRows={numberOfRows}
                    additionalColsTables={additionalColsTables}
                  />
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default PDFTableComponent;
