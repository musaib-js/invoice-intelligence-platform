import React from "react";
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

export default function RawTable({ data }) {
  const headers = Object.values(data[0]).map((entry) => entry.text);
  const dataForTable = data.slice(1, data.length);
  // const headers = Object.keys(data[Object.keys(data)[0]]);
  const width = "100%";
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
            {headers.map((header, index) => (
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
          {Object.keys(dataForTable).map((key, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td
                  style={{
                    backgroundColor: `${
                      dataForTable[key][colIndex]?.confidence < 80
                        ? "#A9A9A9"
                        : null
                    }`,
                  }}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`Confidence: ${dataForTable[key][colIndex]?.confidence}`}
                  key={colIndex}
                >
                  {dataForTable[key][colIndex].text}
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
