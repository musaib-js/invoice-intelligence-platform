import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Resizable } from "react-resizable";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

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

export default function UnrecognizedCols({showTwo, handleCloseTwo, tableNames, setDataForTableSpecificTable, additionalTableheaders, selectedTable, selectedTableName, dataForTableSpecificAddTab, addColumnFromTableSpecificAdditionalColumns, additionIndex, setAdditionIndex, invNewTableheaders, headerIndex, setHeaderIndex, width}) {
  return (
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
          <div className="d-flex justify-content-center">
            {tableNames.map(
              (tableName) =>
                tableName && (
                  <button
                    key={tableName}
                    onClick={() => {
                      setDataForTableSpecificTable(tableName);
                    }}
                    style={{ textTransform: "capitalize" }}
                    className="btn btn-warning mx-2 mb-2"
                  >
                    {tableName}
                  </button>
                )
            )}
          </div>
          <div
            style={{
              width: width || "100%",
              height: "300px",
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
            {additionalTableheaders.length === 0 && !selectedTable ? (
              <div className="mx-auto text-center">
                Please select a table to view the additional columns
              </div>
            ) : additionalTableheaders.length === 0 && selectedTable ? (
              <div className="mx-auto text-center">
                This table doesn't contain any additional columns
              </div>
            ) : (
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    {additionalTableheaders.map((header, index) => (
                      <th
                        style={{
                          backgroundColor: "#FFF2CD",
                          textTransform: "capitalize",
                          verticalAlign: "middle",
                          cursor: "pointer",
                          borderColor: `${
                            additionIndex == index ? "green" : "transparent"
                          }`,
                          borderWidth: `2px`,
                          borderStyle: `solid`,
                        }}
                        key={index}
                        className="resizable-header"
                        onClick={(e) => {
                          if (selectedTableName === "table_1") {
                            addColumnFromTableSpecificAdditionalColumns(
                              e,
                              index
                            );
                          } else {
                            setAdditionIndex(index);
                          }
                        }}
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
                  {Object.keys(dataForTableSpecificAddTab).map(
                    (key, rowIndex) => (
                      <tr key={rowIndex}>
                        {dataForTableSpecificAddTab.map((header, colIndex) => (
                          <td
                            style={{
                              backgroundColor: `${
                                dataForTableSpecificAddTab[key][colIndex]
                                  ?.confidence < 80
                                  ? "#A9A9A9"
                                  : null
                              }`,
                              borderColor: `${
                                additionIndex == colIndex
                                  ? "green"
                                  : "transparent"
                              }`,
                              borderWidth: `2px`,
                              borderStyle: `solid`,
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
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
          {selectedTable &&
            selectedTableName !== "table_1" &&
            additionIndex !== null && (
              <>
                <h6 className="mx-2 mb-2">Select a target header</h6>
                <div className="container text-center">
                  {invNewTableheaders.map((header, index) => (
                    <button
                      key={index}
                      className={`btn my-2 mx-2 ${
                        index === headerIndex
                          ? "btn-outline-warning"
                          : "btn-warning"
                      }`}
                      onClick={(e) => {
                        setHeaderIndex(index);
                        toast.success(`Header ${header} selected!`);
                      }}
                    >
                      {header}
                    </button>
                  ))}
                </div>
              </>
            )}
          {additionIndex !== null && headerIndex !== null && (
            <div className="text-muted text-sm text-center">
              <em>
                The selected column would be merged with{" "}
                {invNewTableheaders[headerIndex]}
              </em>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-warning"
            onClick={(e) =>
              addColumnFromTableSpecificAdditionalColumns(e, additionIndex)
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
  )
}