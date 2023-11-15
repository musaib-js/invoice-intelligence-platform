import React from 'react'

export default function MetaDataTable({
    invoiceNum,
    verdict,
    concerns,
    humanVerificationReqd,
    failedReasons,
    vendorName,
    vendorNamesSource,
    dueDate,
    invoiceTotal,
    extraChargesAdded,
    extraDiscountsAdded,
    invoiceBalance,
    invoiceDate,
    invoicePaymentTerms,
    invoiceRemitTo,
    invoiceRoute,
    invoiceShipTo,
    invoiceBillTo,
    invoiceGlobalAddresses,
    invoiceSoldTo,
    totalPagesRcvd,
    totalPagesInInvoice,
    totalPagesInInvoiceFromGlobal,
    totalPagesProcessed,
    invoiceTotalFromtable,
}) {
  return (
    <div
    style={{
      width: "100%",
      height: "471px",
      overflowX: "auto",
      overflowY: "auto",
    }}
  >
    <table className="table table-bordered">
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
              {extraChargesAdded 
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
              {extraDiscountsAdded
                ? extraDiscountsAdded?.map((discount, index) => (
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
  )
}
