import React, { useState } from "react";
import { Resizable } from "react-resizable";
import { Tooltip } from "react-tooltip";

const ResizableCell = ({ children, width, ...rest }) => {
  return (
    <Resizable
      width={width}
      height={0}
      handle={<div className="react-resizable-handle" />}
      {...rest}
    >
      <div>{children}</div>
    </Resizable>
  );
};

const Table = ({
  data,
  invoiceTableData,
  width,
  invoiceBalance,
  invoiceDate,
  invoiceNum,
  invoicePaymentTerms,
  invoiceBillTo,
  invoiceShipTo,
  invoiceRoute,
  dueDate,
  invoiceTotal,
  invoiceRemitTo,
  invoiceGlobalAddresses,
  invoiceSoldTo,
  totalPagesInInvoiceFromGlobal,
  totalPagesInInvoice,
  totalPagesRcvd,
  vendorName,
  vendorNamesSource,
  totalPagesProcessed,
  humanVerificationReqd,
  invoiceTotalFromtable,
  invoiceTaxes,
  invoiceDiscount,
  failedReasons,
  verdict,
  concerns,
  extraChargesAdded,
  extraDiscountsAdded,
}) => {
  const [showTable, setShowTable] = useState(false);
  const [showInvoiceTable, setShowInvoiceTable] = useState(false);
  const [showMeta, setShowMeta] = useState(true);

  if (!data || Object.keys(data).length === 0) {
    return <p>Invoice structure is not compatible for detection.</p>;
  }

  const headers = Object.keys(data[Object.keys(data)[0]]);
  console.log(headers);

  const invTableheaders = Object.keys(invoiceTableData[Object.keys(invoiceTableData)[0]]);
  return (
    <>
      <div className="d-flex justify-content-center border my-2">
        <div
          className="border w-100 p-2"
          style={{
            backgroundColor: showTable ? "white" : "#FDFFD0",
            textTransform: "capitalize",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowMeta(true);
            setShowTable(false);
            setShowInvoiceTable(false);
          }}
        >
          Raw Metadata
        </div>
        <button
          className="border w-100 p-2"
          style={{
            backgroundColor: showTable ? "#FDFFD0" : "white",
            textTransform: "capitalize",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowTable(true);
            setShowInvoiceTable(false);
            setShowMeta(false);
          }}
        >
          Raw Table
        </button>
        <button
          className="border w-100 p-2"
          style={{
            backgroundColor: showInvoiceTable ? "#FDFFD0" : "white",
            textTransform: "capitalize",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowInvoiceTable(true);
            setShowTable(false);
            setShowMeta(false);
          }}
        >
          Processed Table
        </button>
      </div>
      {showTable ? (
        <div
          style={{
            width: width || "100%",
            height: "471px",
            overflowX: "scroll",
            overflowY: "scroll",
          }}
        >
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    style={{
                      backgroundColor: "#FFF2CD",
                      textTransform: "capitalize",
                    }}
                    key={index}
                    className="resizable-header"
                  >
                    <ResizableCell width={100}>
                      <div>{header}</div>
                    </ResizableCell>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((key, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td style={{backgroundColor: `${data[key][header]?.confidence<80?"#A9A9A9":null}`}} data-bs-toggle="tooltip" data-bs-placement="top" title={`Confidence: ${data[key][header]?.confidence}`} key={colIndex}>{data[key][header].text}
                    <Tooltip id={colIndex}/></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : showMeta ? (
        <div
          class="container"
          style={{
            width: "100%",
            height: "471px",
            overflowX: "scroll",
            overflowY: "scroll",
          }}
        >
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Number
                </th>
                <td>{invoiceNum}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Verdict
                </th>
                <td>{verdict}</td>
              </tr>
                <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Concerns
                </th>
                <td>
                  <ul>
                    {concerns
                      ? concerns.map((tax, index) => (
                          <li key={index}>{tax}</li>
                        ))
                      : ""}
                  </ul>
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Human Verification Required
                </th>
                <td>{humanVerificationReqd ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Failed Reasons
                </th>
                <td>
                  <ul>
                    {failedReasons
                      ? failedReasons.map((tax, index) => (
                          <li key={index}>{tax}</li>
                        ))
                      : ""}
                  </ul>
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Vendor Names
                </th>
                <td>{vendorName}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Vendor Names Source
                </th>
                <td>{vendorNamesSource}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Due Date
                </th>
                <td>{dueDate ? dueDate : "NA"}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Total
                </th>
                <td>{invoiceTotal}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Extra Charges Added
                </th>
                <td>
                  <ul style={{ textTransform: "capitalize" }}>
                    {extraChargesAdded
                      ? extraChargesAdded.map((charge, index) => (
                          <li key={index}>{charge}</li>
                        ))
                      : ""}
                  </ul>
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Extra Discounts Added
                </th>
                <td>
                  <ul style={{ textTransform: "capitalize" }}>
                    {extraDiscountsAdded
                      ? extraDiscountsAdded.map((discount, index) => (
                          <li key={index}>{discount}</li>
                        ))
                      : ""}
                  </ul>
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Balance Due
                </th>
                <td>{invoiceBalance}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Date
                </th>
                <td>{invoiceDate}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Payment Terms
                </th>
                <td>{invoicePaymentTerms}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Remit To
                </th>
                <td>{invoiceRemitTo}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Route
                </th>
                <td>{invoiceRoute}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Ship To
                </th>
                <td>{invoiceShipTo}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Bill To
                </th>
                <td>{invoiceBillTo}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Global Addresses
                </th>
                <td>
                  <ul style={{ textTransform: "capitalize" }}>
                    {invoiceGlobalAddresses
                      ? invoiceGlobalAddresses.map((address, index) => (
                          <li key={index}>{address}</li>
                        ))
                      : ""}
                  </ul>
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Sold To
                </th>
                <td>{invoiceSoldTo}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Total No. of Pages Received
                </th>
                <td>{totalPagesRcvd}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Total Pages in Invoice
                </th>
                <td>{totalPagesInInvoice}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Total Pages in Invoice from Global
                </th>
                <td>{totalPagesInInvoiceFromGlobal}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Total Pages Processed
                </th>
                <td>{totalPagesProcessed}</td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                >
                  Invoice Total From Table
                </th>
                <td>{invoiceTotalFromtable}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      ) : showInvoiceTable ? (
        <div
        style={{
          width: width || "100%",
          height: "471px",
          overflowX: "scroll",
          overflowY: "scroll",
        }}
      >
        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              {invTableheaders.map((header, index) => (
                <th
                  style={{
                    backgroundColor: "#FFF2CD",
                    textTransform: "capitalize",
                  }}
                  key={index}
                  className="resizable-header"
                >
                  <ResizableCell width={100}>
                    <div>{header}</div>
                  </ResizableCell>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(invoiceTableData).map((key, rowIndex) => (
              <tr key={rowIndex}>
                {invTableheaders.map((header, colIndex) => (
                  <td style={{backgroundColor: `${invoiceTableData[key][header]?.confidence<80?"#A9A9A9":null}`}} data-bs-toggle="tooltip" data-bs-placement="top" title={`Confidence: ${invoiceTableData[key][header].confidence}`} key={colIndex}>{invoiceTableData[key][header].text}
                   <Tooltip id={colIndex}/></td>
                 
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : null}
    </>
  );
};

export default Table;
