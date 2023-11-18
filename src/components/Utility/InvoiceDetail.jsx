import React from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

export default function InvoiceDetail({
  sum,
  extraDiscountsSum,
  invoiceTaxesSum,
  calculatedSum,
  invoiceTotalFromtable,
  invoiceTotal,
  setInvoiceTotal,
  editTotal,
  setEditTotal,
  editDiscount,
  setEditDiscount,
  editTax,
  setEditTax,
  addDiscount,
  setAddDiscount,
  addTax,
  setAddTax,
  handleDiscountChange,
  handleTaxChange,
  taxes,
  discounts,
  setDiscounts,
  newDiscount,
  handleInputChangeDiscountAddition,
  addNewDiscount,
  newTax,
  handleInputChangeTaxAddition,
  addNewTax,
  extraDiscountsAdded,
  setExtraDiscountsAdded,
  extraChargesAdded,
  setExtraChargesAdded,
}) {
  return (
    <Card className="mx-2 my-2 mb-4 p-0">
      <Card.Body>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} lg={2}>
            <p>Calculated Invoice Total </p>
            <ListGroup>
              {" "}
              <ListGroup.Item>${sum}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={12} sm={6} md={4} lg={2}>
            <p>Discounts</p>
            <ListGroup>
              <ListGroup.Item
                onClick={() => {
                  setAddDiscount(true);
                }}
              >
                {addDiscount ? (
                  <>
                    {discounts.map((discount, index) => (
                      <input
                        type="text"
                        className="form-control my-1"
                        key={index}
                        value={discount}
                        onChange={(e) => {
                          const newDiscounts = [...extraDiscountsAdded];
                          newDiscounts[index] = parseFloat(e.target.value);
                          setExtraDiscountsAdded(newDiscounts);
                        }}
                      />
                    ))}
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add"
                        value={newDiscount}
                        onChange={handleInputChangeDiscountAddition}
                      />
                      <div>
                      <PlusCircleFill
                        style={{ cursor: "pointer" }}
                        className=" mx-4 fs-16 mt-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          addNewDiscount();
                        }}
                      />
                      </div>
                    </div>
                  </>
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
                  setAddTax(true);
                }}
              >
                {addTax ? (
                  <>
                    {taxes.map((tax, index) => (
                      <input
                        type="text"
                        className="form-control my-1"
                        key={index}
                        value={tax}
                        onChange={(e) => {
                          const newTaxes = [...extraChargesAdded];
                          newTaxes[index] = parseFloat(e.target.value);
                          setExtraChargesAdded(newTaxes);
                        }}
                      />
                    ))}
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add"
                        value={newTax}
                        onChange={handleInputChangeTaxAddition}
                      />
                      <div>
                      <PlusCircleFill
                        style={{ cursor: "pointer" }}
                        className=" mx-4 fs-16 mt-1"
                        onClick={addNewTax}
                      />
                      </div>
                    </div>
                  </>
                ) : (
                  invoiceTaxesSum?.toFixed(2)
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={12} sm={6} md={4} lg={2}>
            <p>Final Total</p>
            <p>
              <ListGroup>
                {" "}
                <ListGroup.Item
                  className={`${
                    calculatedSum - invoiceTotalFromtable > 0 ||
                    calculatedSum - invoiceTotalFromtable < -0
                      ? "text-danger fw-bolder border-danger"
                      : "text-success fw-bolder border-success"
                  }`}
                >
                  {" "}
                  ${calculatedSum}
                </ListGroup.Item>
              </ListGroup>
            </p>
          </Col>
          <Col xs={12} sm={6} md={4} lg={2}>
            <p>Extracted Total</p>
            <p>
              <ListGroup>
                {" "}
                <ListGroup.Item
                  className={`${
                    calculatedSum - invoiceTotal > 0 ||
                    calculatedSum - invoiceTotal < -0
                      ? "text-danger fw-bolder border-danger"
                      : "text-success fw-bolder border-success"
                  }`}
                >
                  {" "}
                  {editTotal ? (
                    <>
                      <input
                        type="number"
                        onChange={(e) => {
                          setInvoiceTotal(e.target.value);
                        }}
                        className="form-control"
                        value={invoiceTotal}
                        width={"100%"}
                        style={{
                          MozAppearance: "textfield",
                          appearance: "textfield",
                        }}
                        onBlur={() => {
                          setEditTotal(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <span
                        onClick={() => {
                          setEditTotal(true);
                        }}
                      >
                        ${invoiceTotal}
                      </span>
                    </>
                  )}
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
                  invoiceTotalFromtable - calculatedSum > 0 ||
                  invoiceTotalFromtable - calculatedSum < -0
                    ? "text-danger fw-bolder border-danger"
                    : "text-success fw-bolder border-success"
                }
              >
                $
                {(
                  invoiceTotal -
                  (sum - extraDiscountsSum + invoiceTaxesSum)
                ).toFixed(2)}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
