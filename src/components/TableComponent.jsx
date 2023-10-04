import React, { useState } from 'react';
import { Resizable } from 'react-resizable';

const ResizableCell = ({ children, width, ...rest }) => {
  return (
    <Resizable width={width} height={0} handle={<div className="react-resizable-handle" />} {...rest}>
      <div>{children}</div>
    </Resizable>
  );
};

const Table = ({ data, width, invoiceBalance, invoiceDate, invoiceNum, invoicePaymentTerms, invoiceBillTo, invoiceShipTo, invoiceRoute, dueDate, invoiceTotal, invoiceRemitTo, invoiceGlobalAddresses }) => {
  const [showTable, setShowTable] = useState(false)
  if (!data || Object.keys(data).length === 0) {
    return <p>Invoice structure is not compatible for detection.</p>;
  }

  const headers = Object.keys(data[Object.keys(data)[0]]);
  console.log(headers)

  return (
    <>
      <div className="d-flex justify-content-center border my-2">
        <div className='border w-100 p-2' style={{backgroundColor: showTable ? 'white' : '#FDFFD0', textTransform: "capitalize", cursor: "pointer"}} onClick={() => { setShowTable(false) }}>Meta Data</div>
        <button className='border w-100 p-2' style={{backgroundColor: showTable ? '#FDFFD0' : 'white', textTransform: "capitalize", cursor: "pointer"}} onClick={() => { setShowTable(true) }}>Table</button>
      </div>
      {showTable ? (
        <div style={{ width: width || '100%', height: '471px', overflowX: 'scroll', overflowY: "scroll" }}>
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th style={{ backgroundColor: "#FFF2CD", textTransform: "capitalize" }} key={index} className="resizable-header">
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
                    <td key={colIndex}>{data[key][header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <div class="container" style={{ width: "100%", height: '471px', overflowX: 'scroll', overflowY: "scroll" }}>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Number</th>
              <td>{invoiceNum}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Due Date</th>
              <td>{dueDate}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Total</th>
              <td>{invoiceTotal}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Balance Due</th>
              <td>{invoiceBalance}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Date</th>
              <td>{invoiceDate}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Payment Terms</th>
              <td>{invoicePaymentTerms}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Remit To</th>
              <td>{invoiceRemitTo}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Route</th>
              <td>{invoiceRoute}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Ship To</th>
              <td>{invoiceShipTo}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Bill To</th>
              <td>{invoiceBillTo}</td>
            </tr>
            <tr>
              <th style={{ width: "200px", backgroundColor: "#FFF2CD", textTransform: "capitalize" }}>Invoice Global Addresses</th>
              <td><ul style={{textTransform: "capitalize" }}>{invoiceGlobalAddresses? invoiceGlobalAddresses.map((address, index) => (
                <li key={index}>{address}</li>
              )): ""}</ul></td>
            </tr>
          </tbody>
        </table>
      </div>
      }
    </>
  );
};

export default Table;
