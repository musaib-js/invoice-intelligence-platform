import React, { useState } from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaDataTable from "./Tables/MetaDataTable";
import ProcessedTable from "./Tables/ProcessedTable";
import RawTable from "./Tables/RawTable";
import HumanVerification from "./Tables/HumanVerification";
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
  respData,
}) => {
  const [showTable, setShowTable] = useState(false);
  const [showInvoiceTable, setShowInvoiceTable] = useState(false);
  const [showMeta, setShowMeta] = useState(true);
  const [showHumanVerification, setShowHumanVerification] = useState(false);
  const [rowDataForExtendedPrice, setRowDataForExtendedPrice] = useState([]);

  if (!data || Object.keys(data).length === 0) {
    return <p>Invoice structure is not compatible for detection.</p>;
  }
  

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
        draggaeble
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
        <RawTable data={data} />
      ) : showMeta ? (
        <MetaDataTable
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
          totalPagesInInvoiceFromGlobal={totalPagesInInvoiceFromGlobal}
          totalPagesInInvoice={totalPagesInInvoice}
          totalPagesRcvd={totalPagesRcvd}
          vendorName={vendorName}
          vendorNamesSource={vendorNamesSource}
          totalPagesProcessed={totalPagesProcessed}
          humanVerificationReqd={humanVerificationReqd}
          invoiceTotalFromtable={invoiceTotalFromtable}
          invoiceTaxes={invoiceTaxes}
          invoiceDiscount={invoiceDiscount}
          failedReasons={failedReasons}
          verdict={verdict}
          concerns={concerns}
          extraChargesAdded={extraChargesAdded}
          extraDiscountsAdded={extraDiscountsAdded}
        />
      ) : showInvoiceTable ? (
        <ProcessedTable invoiceTableData={invoiceTableData} />
      ) : showHumanVerification ? (
        <HumanVerification 
        invoiceTableData={invoiceTableData} 
        extraDiscountsAdded = {extraDiscountsAdded}
        invoiceTaxes = {invoiceTaxes}
        respData = {respData}
        invoiceTotalFromtable = {invoiceTotalFromtable}
        rowDataForExtendedPrice={rowDataForExtendedPrice}
        setRowDataForExtendedPrice = {setRowDataForExtendedPrice}
         />
      ) : null}

    <hr className="featurette-divider"/>
    </>
  );
};

export default Table;