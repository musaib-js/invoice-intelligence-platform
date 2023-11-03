import React, { useEffect, useState } from "react";
import { Resizable } from "react-resizable";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

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
  const [showHumanVerification, setShowHumanVerification] = useState(false);
  const [rowDataForExtendedPrice, setRowDataForExtendedPrice] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [changed, setChanged] = useState(false);
  const [rowId, setRowId] = useState(-1);
  const [editableRow, setEditableRow] = useState(-1);
  const [changedInputs, setChangedInputs] = useState([]);
  const [newPayload, setPayload] = useState({ row_id: null, row_data: {} });
  const [editDiscount, setEditDiscount] = useState(false);
  const [editTax, setEditTax] = useState(false);
  const [newDiscounts, setNewDiscounts] = useState([]);
  const [newTaxes, setNewTaxes] = useState([]);
  const [extraDiscountsSum, setExtraDiscountsSum] = useState(0);
  const [invoiceTaxesSum, setInvoiceTaxesSum] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    if(extraDiscountsAdded[0]==="NA"){
      setDiscounts([0])
    }
    else{
      setDiscounts(extraDiscountsAdded);
    }
    if(invoiceTaxes[0]==="NA"){
      setTaxes([0])
    }
    else{
    setTaxes(invoiceTaxes);
    }
  }, []);
  
  useEffect(() => {
    setExtraDiscountsSum(
      discounts[0] === "NA" || discounts.length === 0 || discounts[0] === isNaN
        ? 0
        : discounts.reduce((acc, discount) => acc + discount, 0)
    );
    setInvoiceTaxesSum(
      taxes[0] === "NA" || taxes.length === 0 || taxes[0] === isNaN
        ? 0
        : taxes.reduce((acc, tax) => acc + tax, 0)
    );
  }, [discounts, taxes])
  useEffect(() => {}, [editDiscount, editTax]);
  if (!data || Object.keys(data).length === 0) {
    return <p>Invoice structure is not compatible for detection.</p>;
  }
  const handleDiscountChange = (e, index) => {
    const updatedDiscounts = [...discounts];
    updatedDiscounts[index] = e.target.value;
    setDiscounts(updatedDiscounts);

  };
  const handleTaxChange = (e, index) => {
    try{
    const updatedTaxes = [...taxes];
    updatedTaxes[index] = e.target.value;
    setTaxes(updatedTaxes);
    }catch(error){
      console.log("the errrrrr", error)
    }
  };

  const headers = Object.keys(data[Object.keys(data)[0]]);
  console.log("The data is", data);
  // console.log("The headers are", headers);

  const invTableheaders = Object.keys(
    invoiceTableData[Object.keys(invoiceTableData)[0]]
  );
  const invNewTableheaders = Object.values(invoiceTableData[0]).map(
    (entry) => entry.text
  );
  const dataForEditabletable = invoiceTableData.slice(
    1,
    invoiceTableData.length
  );
  console.log("inv table data", invoiceTableData);
  console.log("The table data edit are", dataForEditabletable);

  // Function to handle the edit icon click
  const handleEditIconClick = (rowId) => {
    setEditableRow(rowId);
    const initialRowData = {};
    invNewTableheaders.forEach((header) => {
      initialRowData[header] = String(
        dataForEditabletable[rowId][invNewTableheaders.indexOf(header)].text
      );
    });
    setPayload({ row_id: rowId, row_data: initialRowData });
  };

  // Function to handle input changes
  const handleInputChange = (header, value) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      row_data: {
        ...prevPayload.row_data,
        [header]: String(value),
      },
    }));
  };
  const extendedPriceColIndex = invNewTableheaders.findIndex(
    (header) => header === "Extended Price"
  );
  let sum = 0;
  const calculateExtendedPrice = async () => {
    console.log("the extended price index", extendedPriceColIndex);
    console.log("The changed inputs are", changedInputs);
    await axios
      .post(`${process.env.REACT_APP_EXTENDED_PRICE}`, newPayload)
      .then((response) => {
        console.log("the respons is", response);
        console.log("edit table data", dataForEditabletable);
        console.log("the row Id is", rowId);
        dataForEditabletable[rowId][extendedPriceColIndex].text =
          response.data["Extended Price"].text;
        dataForEditabletable[rowId][extendedPriceColIndex].confidence =
          response.data["Extended Price"].confidence;
        changedInputs.forEach((entry) => {
          dataForEditabletable[rowId][entry.indexId].text = entry.value;
        });
        toast.success("Extended Price Calculated Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditableRow(-1);
        setRowId(-1);
        setChanged(false);
        setChangedInputs([]);
        setPayload({ row_id: null, row_data: {} });
      })
      .catch((error) => {
        console.log("comign here", error);
        toast.error(error);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="d-flex justify-content-center border my-2">
        <div
          className="border w-100 p-2"
          style={{
            backgroundColor: showMeta ? "#FDFFD0" : "white",
            textTransform: "capitalize",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowMeta(true);
            setShowTable(false);
            setShowInvoiceTable(false);
            setShowHumanVerification(false);
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
            setShowHumanVerification(false);
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
            setShowHumanVerification(false);
          }}
        >
          Processed Table
        </button>
        <button
          className="border w-100 p-2"
          style={{
            backgroundColor: showHumanVerification ? "#FDFFD0" : "white",
            textTransform: "capitalize",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowHumanVerification(true);
            setShowInvoiceTable(false);
            setShowTable(false);
            setShowMeta(false);
          }}
        >
          Human Verification
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
                    <td
                      style={{
                        backgroundColor: `${
                          data[key][header]?.confidence < 80 ? "#A9A9A9" : null
                        }`,
                      }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Confidence: ${data[key][header]?.confidence}`}
                      key={colIndex}
                    >
                      {data[key][header].text}
                      <Tooltip id={colIndex} />
                    </td>
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
                      ? concerns.map((tax, index) => <li key={index}>{tax}</li>)
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
                    {extraChargesAdded != "NA"
                      ? extraChargesAdded?.map((charge, index) => (
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
                    {extraDiscountsAdded != "NA"
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
                    <td
                      style={{
                        backgroundColor: `${
                          invoiceTableData[key][header]?.confidence < 80
                            ? "#A9A9A9"
                            : null
                        }`,
                      }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Confidence: ${invoiceTableData[key][header].confidence}`}
                      key={colIndex}
                    >
                      {invoiceTableData[key][header].text}
                      <Tooltip id={colIndex} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : showHumanVerification ? (
        <>
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
                  {invNewTableheaders.map((header, index) => (
                    <th
                      style={{
                        backgroundColor: "#FFF2CD",
                        textTransform: "capitalize",
                        verticalAlign: "middle",
                      }}
                      key={index}
                      className="resizable-header"
                    >
                      <ResizableCell style={{ width: 150 }}>
                        <div
                          style={{
                            lineHeight: "1.5",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {header}
                        </div>
                      </ResizableCell>
                    </th>
                  ))}
                  <th
                    style={{
                      backgroundColor: "#FFF2CD",
                      textTransform: "capitalize",
                      verticalAlign: "middle",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(dataForEditabletable).map((key, rowIndex) => (
                  <tr key={rowIndex}>
                    {invNewTableheaders.map((header, colIndex) => (
                      <td
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Confidence: ${dataForEditabletable[key][colIndex].confidence}`}
                        key={colIndex}
                      >
                        {editableRow === key ? (
                          <input
                            className="form-control"
                            value={
                              changed
                                ? rowDataForExtendedPrice.header
                                : dataForEditabletable[key][colIndex].text
                            }
                            disabled={
                              header === "Extended Price" ? true : false
                            }
                            onChange={(e) => {
                              handleInputChange(header, e.target.value);
                              setChanged(true);
                            }}
                            onBlur={(e) => {
                              setChangedInputs([
                                ...changedInputs,
                                { indexId: colIndex, value: e.target.value },
                              ]);
                              console.log("the col index is", colIndex);
                            }}
                          ></input>
                        ) : (
                          <>
                            {dataForEditabletable[key][colIndex].text}
                            <Tooltip id={colIndex} />
                          </>
                        )}
                      </td>
                    ))}
                    <td>
                      {editableRow === key ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          class="bi bi-check"
                          viewBox="0 0 16 16"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            calculateExtendedPrice();
                          }}
                        >
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pen"
                          viewBox="0 0 16 16"
                          onClick={() => {
                            setRowId(key);
                            setEditableRow(key);
                            handleEditIconClick(key);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Card className="mx-2 my-2 mb-2 p-0">
            <Card.Body>
              <Row>
                <Col xs={3}>
                  <p>Invoice Total </p>
                  <ListGroup>
                    {" "}
                    <ListGroup.Item>${invoiceTotalFromtable}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col xs={2}>
                  <p>Discounts</p>
                  <ListGroup>
                    {discounts !== "NA" && discounts.length > 0 ? (
                      discounts.map((discount, index) => (
                        <ListGroup.Item
                          key={index}
                          onClick={() => {
                            setEditDiscount(true);
                          }}
                        >
                          {editDiscount ? (
                            <input
                              onChange={(e) => handleDiscountChange(e, index)}
                              className="form-control"
                              value={discount}
                            />
                          ) : (
                            discount
                          )}
                        </ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>No discounts applied</ListGroup.Item>
                    )}
                  </ListGroup>
                </Col>
                <Col xs={2}>
                  <p>Taxes</p>
                  <ListGroup>
                    {taxes !== "NA" && taxes.length > 0 ? (
                      taxes.map((tax, index) => (
                        <ListGroup.Item
                          key={index}
                          onClick={() => {
                            setEditTax(true);
                          }}
                        >
                          {editTax ? (
                            <input
                              onChange={(e) => handleTaxChange(e, index)}
                              className="form-control"
                              value={tax}
                            />
                          ) : (
                            tax
                          )}
                        </ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>No taxes applied</ListGroup.Item>
                    )}
                  </ListGroup>
                </Col>
                <Col xs={3}>
                  <p>Calculated Total </p>
                  <p
                    className={`${
                      sum -
                        extraDiscountsSum +
                        invoiceTaxesSum -
                        invoiceTotalFromtable >
                      30
                        ? "text-danger fw-bolder"
                        : "text-success fw-bolder"
                    }`}
                  >
                    {Object.keys(dataForEditabletable).forEach((key) => {
                      const value =
                        dataForEditabletable[key][extendedPriceColIndex].text;
                      sum += parseFloat(value);
                    })}
                    <ListGroup>
                      {" "}
                      <ListGroup.Item>
                        {" "}
                        $
                        {(sum - extraDiscountsSum + parseFloat(invoiceTaxesSum))}
                      </ListGroup.Item>
                    </ListGroup>
                  </p>
                </Col>
                <Col xs={2}>
                  <p>Difference </p>
                  <ListGroup>
                    {" "}
                    <ListGroup.Item>
                      $
                      {(
                        invoiceTotalFromtable -
                        (sum - extraDiscountsSum + invoiceTaxesSum)
                      ).toFixed(2)}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          {/* <div className="d-flex justify-content-end my-2 mx-2 mb-4">
            <button
              className="shadow-lg btn mx-1 btn-sm"
              style={{ backgroundColor: "rgb(255, 242, 205)" }}
            >
              Accept
            </button>
            <button className="shadow-lg btn mx-1 btn-sm btn-danger">
              Reject
            </button>
            <button className="shadow-lg btn mx-1 btn-sm btn-warning">
              Save
            </button>
          </div> */}
        </>
      ) : null}
    </>
  );
};

export default Table;
