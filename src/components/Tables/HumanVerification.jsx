import React from "react";
import { useState, useEffect } from "react";
import { Resizable } from "react-resizable";
import { Tooltip } from "react-tooltip";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PlusCircleFill } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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

export default function HumanVerification({
  invoiceTableData,
  setInvoiceTableData,
  respData,
  invoiceTotalFromtable,
  extraDiscountsAdded,
  invoiceTaxes,
  width,
  invTableheaders,
  rowDataForExtendedPrice,
  additionalCols,
  tableSpecificAddCols,
  additionalHeaders,
}) {
  const [extraDiscountsSum, setExtraDiscountsSum] = useState(0);
  const [invoiceTaxesSum, setInvoiceTaxesSum] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [changed, setChanged] = useState(false);
  const [rowId, setRowId] = useState(-1);
  const [editableRow, setEditableRow] = useState(-1);
  const [changedInputs, setChangedInputs] = useState([]);
  const [newPayload, setPayload] = useState({ row_id: null, row_data: {} });
  const [editDiscount, setEditDiscount] = useState(false);
  const [editTax, setEditTax] = useState(false);
  const [sum, setSum] = useState(0);
  const [extendedPriceColIndex, setExtendedPriceColIndex] = useState(0);
  const [dataForEditabletable, setDataForEditableTable] = useState([]);
  const [invNewTableheaders, setInvNewTableHeaders] = useState([]);
  const [dataForAdditionaltable, setDataForAdditionalTable] = useState([]);
  const [invAdditionalTableheaders, setInvAdditionalTableHeaders] = useState([]);
  const [dataForTableSpecificAddTab, setDataForTableSpecificAddTab] = useState([]);
  const [additionalTableheaders, setAdditionalTableHeaders] = useState([]);
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseTwo = () => setShowTwo(false);
  const handleShowTwo = () => setShowTwo(true);

  useEffect(() => {
    const calculateSum = () => {
      let updatedSum = 0;

      Object.keys(dataForEditabletable).forEach((key) => {
        const value = dataForEditabletable[key][extendedPriceColIndex]?.text;
        if (value) {
          updatedSum += parseFloat(value);
        }
      });

      setSum(updatedSum);
    };

    if (
      extraDiscountsAdded?.[0] === "NA" ||
      extraDiscountsAdded?.length === 0 ||
      isNaN(extraDiscountsAdded?.[0])
    ) {
      setDiscounts([0]);
    } else {
      setDiscounts(extraDiscountsAdded);
    }

    if (
      invoiceTaxes?.[0] === "NA" ||
      invoiceTaxes?.length === 0 ||
      isNaN(invoiceTaxes?.[0])
    ) {
      setTaxes([0]);
    } else {
      setTaxes(invoiceTaxes);
    }
    setExtraDiscountsSum(
      discounts?.[0] === "NA" ||
        discounts?.length === 0 ||
        isNaN(discounts?.[0])
        ? 0
        : discounts?.reduce((acc, discount) => acc + discount, 0)
    );

    setInvoiceTaxesSum(
      taxes?.[0] === "NA" || taxes?.length === 0 || isNaN(taxes?.[0])
        ? 0
        : taxes?.reduce((acc, tax) => acc + tax, 0)
    );

    setInvNewTableHeaders(
      Object.values(invoiceTableData[0]).map((entry) => entry.text)
    );

    setDataForEditableTable(invoiceTableData.slice(1, invoiceTableData.length));

    setInvAdditionalTableHeaders(
      Object.values(additionalCols[0]).map((entry) => entry.text)
    );

    setDataForAdditionalTable(additionalCols.slice(1, additionalCols.length));

    setAdditionalTableHeaders(
      Object.values(tableSpecificAddCols[0]).map((entry) => entry.text)
    );

    setDataForTableSpecificAddTab(tableSpecificAddCols.slice(1, tableSpecificAddCols.length));

    setExtendedPriceColIndex(
      invNewTableheaders.findIndex((header) => header === "Extended Price")
    );

    calculateSum();
  }, [
    discounts,
    taxes,
    dataForEditabletable,
    extendedPriceColIndex,
    invoiceTableData,
    invNewTableheaders,
    editableRow
  ]);

  const generateEmptyRow = () => {
    const emptyRow = {};
    for (let i = 0; i < invNewTableheaders.length; i++) {
      emptyRow[i] = {
        confidence: 100,
        text: "",
      };
    }
    return emptyRow;
  };

  const addEmptyRow = () => {
    setInvoiceTableData((prevData) => [...prevData, generateEmptyRow()]);
  };

  const handleDiscountChange = (e) => {
    setExtraDiscountsSum(parseFloat(e.target.value));
  };
  const handleTaxChange = (e) => {
    setInvoiceTaxesSum(parseFloat(e.target.value));
  };

  // Function to handle the edit click
  const handleEditIconClick = (rowId) => {
    setEditableRow(rowId);
    const initialRowData = {};
    invNewTableheaders.forEach((header) => {
      initialRowData[header] = String(
        dataForEditabletable[rowId][invNewTableheaders.indexOf(header)]?.text
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

  const calculateExtendedPrice = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_EXTENDED_PRICE}`,
        newPayload
      );

      const updatedDataForEditableTable = [...dataForEditabletable];
      updatedDataForEditableTable[rowId][extendedPriceColIndex].text =
        response.data["Extended Price"].text;
      updatedDataForEditableTable[rowId][extendedPriceColIndex].confidence =
        response.data["Extended Price"].confidence;
      changedInputs.forEach((entry) => {
        updatedDataForEditableTable[rowId][entry.indexId].text = entry.value;
      });

      // Update the state with the new data
      setDataForEditableTable(updatedDataForEditableTable);

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
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error calculating Extended Price.");
    }
  };

  // Function to handle the save click
  const handleSaveClick = async () => {
    try {
      const payload = { ...respData };
      const updatedData = [...dataForEditabletable];
      updatedData.unshift(invoiceTableData[0]);
      console.log("first", updatedData);
      const reversedData = {};
      const keys = Object.keys(updatedData[0]);
      for (const key of keys) {
        reversedData[key] = {};
      }

      // Iterate over the data and populate the reversedData object
      for (const obj of updatedData) {
        for (const key of keys) {
          reversedData[key] = {
            ...reversedData[key],
            [updatedData.indexOf(obj)]: obj[key],
          };
        }
      }
      payload["invoice_1"] = reversedData;
      console.log("Updated payload:", payload);
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/save_invoice`, payload)
        .then((res) => {
          console.log("Response from backend:", res);
          toast.success("Invoice saved successfully!");
        })
        .catch((err) => {
          console.log("Error in saving invoice:", err);
          toast.error("Error in saving invoice.");
        });
    } catch (error) {
      console.error("Error in handleSaveClick:", error);
    }
  };

  return (
    <>
      <div
        style={{
          width: width || "100%",
          height: "471px",
          overflowX: "scroll",
          overflowY: "scroll",
        }}
      >
        <table className="table table-striped table-responsive table-bordered">
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
                      <select className="form-select">
                        <option value={header}>{header}</option>
                        {additionalHeaders.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </ResizableCell>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(dataForEditabletable).map((key, rowIndex) => (
              <tr key={rowIndex}>
                {invNewTableheaders.map((header, colIndex) => (
                  <td
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Confidence: ${dataForEditabletable[key][colIndex]?.confidence}`}
                    key={colIndex}
                    onClick={() => {
                      setRowId(key);
                      setEditableRow(key);
                      handleEditIconClick(key);
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        dataForEditabletable[key][colIndex]?.confidence < 80
                          ? "#F8C8BE"
                          : null
                      }`,
                    }}
                    className={`${
                      dataForEditabletable[key][colIndex]?.confidence < 80
                        ? "border border-danger"
                        : "border border-success"
                    }`}
                  >
                    {editableRow === key ? (
                      <input
                        className="form-control"
                        value={
                          changed
                            ? rowDataForExtendedPrice.header
                            : dataForEditabletable[key][colIndex]?.text
                        }
                        disabled={header === "Extended Price" ? true : false}
                        onChange={(e) => {
                          handleInputChange(header, e.target.value);
                          setChanged(true);
                          setChangedInputs([
                            ...changedInputs,
                            { indexId: colIndex, value: e.target.value },
                          ]);
                        }}
                        onBlur={(e) => {
                          calculateExtendedPrice();
                          console.log("the col index is", colIndex);
                        }}
                      ></input>
                    ) : (
                      <>
                        {dataForEditabletable[key][colIndex]?.text}
                        <Tooltip id={colIndex} />
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <div className="mx-2">
            <PlusCircleFill
              onClick={() => {
                addEmptyRow();
              }}
              className="mx-auto fs-32"
              style={{
                fontSize: "2rem",
                color: "yellow",
                cursor: "pointer",
              }}
            ></PlusCircleFill>
            <p className="mx-auto">Add Row</p>
          </div>

          <div className="mx-2">
            <PlusCircleFill
              onClick={() => {
                handleShow();
              }}
              className="mx-auto fs-32"
              style={{
                fontSize: "2rem",
                color: "yellow",
                cursor: "pointer",
              }}
            ></PlusCircleFill>
            <p className="mx-auto">Add Column From Combined</p>
          </div>
          <div className="mx-2">
            <PlusCircleFill
              onClick={() => {
                handleShowTwo();
              }}
              className="mx-auto fs-32"
              style={{
                fontSize: "2rem",
                color: "yellow",
                cursor: "pointer",
              }}
            ></PlusCircleFill>
            <p className="mx-auto">Add Column From Table</p>
          </div>
        </div>
      </div>
      <Card className="mx-2 my-2 mb-4 p-0">
        <Card.Body>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={2}>
              <p>Invoice Total </p>
              <ListGroup>
                {" "}
                <ListGroup.Item>${invoiceTotalFromtable}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <p>Discounts</p>
              <ListGroup>
                <ListGroup.Item
                  onClick={() => {
                    setEditDiscount(true);
                  }}
                >
                  {editDiscount ? (
                    <input
                      // type="number"
                      onChange={(e) => handleDiscountChange(e)}
                      className="form-control"
                      value={parseFloat(extraDiscountsSum)}
                      width={"50px"}
                    />
                  ) : (
                    extraDiscountsSum.toFixed(2)
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <p>Taxes</p>
              <ListGroup>
                <ListGroup.Item
                  onClick={() => {
                    setEditTax(true);
                  }}
                >
                  {editTax ? (
                    <input
                      // type="number"
                      onChange={(e) => handleTaxChange(e)}
                      className="form-control"
                      value={parseFloat(invoiceTaxesSum)}
                      width={"50px"}
                    />
                  ) : (
                    invoiceTaxesSum?.toFixed(2)
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <p>Total</p>
              <p>
                <ListGroup>
                  {" "}
                  <ListGroup.Item
                    className={`${
                      sum -
                        extraDiscountsSum +
                        invoiceTaxesSum -
                        invoiceTotalFromtable >
                      30
                        ? "text-danger fw-bolder border-danger"
                        : "text-success fw-bolder border-success"
                    }`}
                  >
                    {" "}
                    $
                    {(
                      sum -
                      extraDiscountsSum +
                      parseFloat(invoiceTaxesSum)
                    ).toFixed(2)}
                  </ListGroup.Item>
                </ListGroup>
              </p>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <p>Difference </p>
              <ListGroup>
                {" "}
                <ListGroup.Item
                  className={
                    invoiceTotalFromtable -
                      (sum - extraDiscountsSum + invoiceTaxesSum) >
                      30 ||
                    invoiceTotalFromtable -
                      (sum - extraDiscountsSum + invoiceTaxesSum) <
                      -30
                      ? "text-danger fw-bolder border-danger"
                      : "text-success fw-bolder border-success"
                  }
                >
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
      <div className="d-flex justify-content-end my-2 mx-2 mb-4">
        <button
          className="shadow-lg btn mx-1 btn-sm"
          style={{ backgroundColor: "rgb(255, 242, 205)" }}
        >
          Accept
        </button>
        <button className="shadow-lg btn mx-1 btn-sm btn-danger">Reject</button>
        <button
          className="shadow-lg btn mx-1 btn-sm btn-warning"
          onClick={() => handleSaveClick()}
        >
          Save
        </button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Columns from Combined Additional Columns
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  {invAdditionalTableheaders.map((header, index) => (
                    <th
                      style={{
                        backgroundColor: "#FFF2CD",
                        textTransform: "capitalize",
                        verticalAlign: "middle",
                      }}
                      key={index}
                      className="resizable-header"
                    >
                      <ResizableCell width={100}>
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
                </tr>
              </thead>
              <tbody>
                {Object.keys(dataForAdditionaltable).map((key, rowIndex) => (
                  <tr key={rowIndex}>
                    {dataForAdditionaltable.map((header, colIndex) => (
                      <td
                        style={{
                          backgroundColor: `${
                            dataForAdditionaltable[key][colIndex]?.confidence <
                            80
                              ? "#A9A9A9"
                              : null
                          }`,
                        }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Confidence: ${dataForAdditionaltable[key][colIndex]?.confidence}`}
                        key={colIndex}
                      >
                        {dataForAdditionaltable[key][colIndex]?.text}
                        <Tooltip id={colIndex} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClose()}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTwo}
        onHide={handleCloseTwo}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Columns From Table Specific Additional Columns
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  {additionalTableheaders.map((header, index) => (
                    <th
                      style={{
                        backgroundColor: "#FFF2CD",
                        textTransform: "capitalize",
                        verticalAlign: "middle",
                      }}
                      key={index}
                      className="resizable-header"
                    >
                      <ResizableCell width={100}>
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
                </tr>
              </thead>
              <tbody>
                {Object.keys(dataForTableSpecificAddTab).map((key, rowIndex) => (
                  <tr key={rowIndex}>
                    {dataForTableSpecificAddTab.map((header, colIndex) => (
                      <td
                        style={{
                          backgroundColor: `${
                            dataForTableSpecificAddTab[key][colIndex]?.confidence <
                            80
                              ? "#A9A9A9"
                              : null
                          }`,
                        }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Confidence: ${dataForTableSpecificAddTab[key][colIndex]?.confidence}`}
                        key={colIndex}
                      >
                        {dataForTableSpecificAddTab[key][colIndex]?.text}
                        <Tooltip id={colIndex} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleCloseTwo()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}