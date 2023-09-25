import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TableComponent from './TableComponent';
import { pdfjs } from 'react-pdf';
import { ArrowRightCircleFill, ArrowLeftCircleFill } from 'react-bootstrap-icons';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const PDFTableComponent = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [tableData, setTableData] = useState([])
  const [pdfUrl, setPdfUrl] = useState(null)
  const [invoiceNum, setInvoiceNum] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [dueDate, setdueDate] = useState('')
  const [vendorName, setvendorName] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalInvoices, setTotalInvoices] = useState(0)
  const [newPage, setNewpage] = useState(0)
  const [tempValue, setTempValue] = useState(1)

  useEffect(() => {
    if (pageNumber === 0) {
      return;
    }
    setLoading(true);
    const apiUrl = `${process.env.REACT_APP_INVOICE_URL}/${pageNumber}`;
    axios.get(apiUrl)
      .then((response) => {
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
        setPdfUrl(response.data.response.pdf_link);
        setInvoiceNum(response.data.response.invoice_number);
        setInvoiceDate(response.data.response.invoice_due_date);
        setvendorName(response.data.response.vendor_name);
        setTotalInvoices(response.data.response.total_invoices);
        setdueDate(response.data.response.due_date)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [pageNumber]);

  const handleInputChange = (e) => {
    const newValue = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    setTempValue(parseInt(newValue));
  };

  const handleBlur = () => {
    setPageNumber(tempValue);
  };
  return (
    <Container className='mt-4'>
      {loading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#F57E37', '#1BBEE9', '#F57E37', '#1BBEE9', '#F57E37', '#1BBEE9']}
        />
      ) : (
        <Row>
          <Col md={6}>
            <div
              style={{
                height: '530px',
              }}
            >
              <iframe title='pdf' src={pdfUrl} width="100%" height="530" frameborder="0" allow='autoplay'></iframe>
            </div>
            <div style={{ textAlign: 'justify' }} className='my-4 container'>
              <div className='my-4'>
                Invoice Number:{' '}
                <span style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: "6px" }}>{invoiceNum}</span>
              </div>
              <div className='my-4'>
                Due Date:{' '}
                <span style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: "6px" }}>{dueDate}</span>
              </div>
              {/* <div className='my-4'>
              Vendor Name:{' '}
              <span style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: "6px" }}>{vendorName}</span>
            </div> */}
              <div className='my-4'>
                Invoice Date:{' '}
                <span style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: "6px" }}>{invoiceDate}</span>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className='mb-4' style={{ height: '530px', overflowX: 'scroll', overflowY: "scroll" }}>
              <TableComponent data={tableData} />
            </div>
            <span className='my-4 mx-2'><ArrowLeftCircleFill onClick={() => {
              setPageNumber(tempValue - 1)
              setTempValue(tempValue - 1)
            }} size={40} /></span>
            <span className='my-4 mx-2'>
              <input
                value={tempValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className='btn btn-secondary'
                style={{ width: '50px' }}
              />
              <span className='my-4'> <strong>/</strong> <input value={`${totalInvoices}`} className='btn btn-secondary' style={{ width: '50px', cursor: 'default' }} /></span></span>
            <span className='my-4 mx-2'><ArrowRightCircleFill onClick={() => {
              setPageNumber(tempValue + 1)
              setTempValue(tempValue + 1)
            }} size={40} /></span>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PDFTableComponent;
