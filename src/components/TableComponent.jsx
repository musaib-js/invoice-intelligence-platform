import React from 'react';
import { Resizable } from 'react-resizable';

const ResizableCell = ({ children, width, ...rest }) => {
  return (
    <Resizable width={width} height={0} handle={<div className="react-resizable-handle" />} {...rest}>
      <div>{children}</div>
    </Resizable>
  );
};

const Table = ({ data, width }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p>No data to display.</p>;
  }

  const headers = Object.keys(data[Object.keys(data)[0]]);
  console.log(headers)

  return (
    <div style={{ width: width || '100%' }}>
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
  );
};

export default Table;
