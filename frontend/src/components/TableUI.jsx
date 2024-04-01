import React from "react";

export default function TableUI({headers_ru, rows }) {
	console.log("GOLOVA", headers_ru)
	console.log("STROKA", rows)
  const headers = headers_ru
  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            {headers.map((headers_ru, index) => (
              <th
                key={index}
                className="table-header"
              >
                {headers_ru}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row_value, index) => (
            <tr key={index}>
              {row_value.map((cell_value, index) => (
                <td
                  key={index}
                  className="table-row"
                >
                  {cell_value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
