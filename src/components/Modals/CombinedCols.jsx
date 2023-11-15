import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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

export default function CombinedCols({show, handleClose, invAdditionalTableheaders, dataForAdditionaltable, addNewColumn, width}) {
  return (
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
                    cursor: "pointer",
                  }}
                  key={index}
                  className="resizable-header"
                  onClick={(e) => addNewColumn(e, index)}
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
      <Button className="btn-danger" onClick={() => handleClose()}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}