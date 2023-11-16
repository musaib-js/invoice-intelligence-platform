import React from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { PlusCircleFill } from 'react-bootstrap-icons'

export default function InvoiceDetail({sum, extraDiscountsSum, invoiceTaxesSum, calculatedSum, invoiceTotalFromtable, invoiceTotal, setInvoiceTotal, editTotal, setEditTotal, editDiscount, setEditDiscount, editTax, setEditTax, addDiscount, setAddDiscount, addTax, setAddTax, handleDiscountChange, handleTaxChange, taxes, discounts, newDiscount, handleInputChangeDiscountAddition, addNewDiscount, newTax, handleInputChangeTaxAddition, addNewTax}) {
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
                setEditDiscount(true);
              }}
            >
              {editDiscount && !addDiscount ? (
                <>
                  <input
                    type="number"
                    onChange={(e) => handleDiscountChange(e)}
                    className="form-control"
                    value={parseFloat(extraDiscountsSum)}
                    width={"100%"}
                    style={{
                      MozAppearance: "textfield",
                      appearance: "textfield",
                    }}
                  />
                  <PlusCircleFill
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {setAddDiscount(true)}}
                  />
                </>
              ) : 
              editDiscount && addDiscount ? (
                <>
                  <select className="form-select mb-3">
                    {discounts.map((discount, index) => (
                      <option key={index} value={discount}>
                        {/* <input type="text" placeholder = {discount} value={discount}/> */}
                        {discount}
                      </option>
                    ))}
                  </select>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add"
                      value={newDiscount}
                      onChange={handleInputChangeDiscountAddition}
                    />
                    <PlusCircleFill style={{cursor: "pointer"}} className=" mx-4 fs-16" onClick={addNewDiscount}/>
                  </div>
                </>
              ) :
              (
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
              {editTax && !addTax ? (
                <>
                  <input
                    type="number"
                    onChange={(e) => handleTaxChange(e)}
                    className="form-control"
                    value={parseFloat(invoiceTaxesSum)}
                    width={"100%"}
                    style={{
                      MozAppearance: "textfield",
                      appearance: "textfield",
                      width: "100%",
                    }}
                  />
                  <PlusCircleFill
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setAddTax(true);
                    }}
                  />
                </>
              ) : editTax && addTax ? (
                <>
                  <select className="form-select mb-3">
                    {taxes.map((tax, index) => (
                      <option key={index} value={tax}>
                        {tax}
                      </option>
                    ))}
                  </select>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add"
                      value={newTax}
                      onChange={handleInputChangeTaxAddition}
                    />
                    <PlusCircleFill style={{cursor: "pointer"}} className=" mx-4 fs-16" onClick={addNewTax}/>
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
                  <span onClick={()=>{setEditTotal(true)}}>${invoiceTotal}</span>
                  </>
                )
                } 
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
                invoiceTotalFromtable - invoiceTotal > 0 ||
                invoiceTotalFromtable - invoiceTotal < -0
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
  )
}
