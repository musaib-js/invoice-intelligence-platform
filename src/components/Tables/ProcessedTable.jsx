import React from "react";
import { Tooltip } from "react-tooltip";
import ResizableCell from "../Utility/ResizableCell";


export default function ProcessedTable({ invoiceTableData }) {
  const invTableheaders = Object.values(invoiceTableData[0]).map(
    (entry) => entry.text
  );
  const dataForInvtable = invoiceTableData.slice(
    1,
    invoiceTableData.length
  );

  const width = "100%"
  return (
    <div
      style={{
        width: width || "100%",
        height: "471px",
        overflowX: "auto",
        overflowY: "auto",
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
                  >{header}</div>
                </ResizableCell>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(dataForInvtable).map((key, rowIndex) => (
            <tr key={rowIndex}>
              {invTableheaders.map((header, colIndex) => (
                <td
                  style={{
                    backgroundColor: `${
                      dataForInvtable[key][colIndex]?.confidence < 80
                        ? "#A9A9A9"
                        : null
                    }`,
                  }}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`Confidence: ${dataForInvtable[key][colIndex]?.confidence}`}
                  key={colIndex}
                >
                  {dataForInvtable[key][colIndex]?.text}
                  <Tooltip id={colIndex} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
