import React, { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import "./Table.scss";
import PrimaryButton from "../PrimaryButton/index.page";

export default function Table({ data, columns, filterParams, ...props }) {
  const [sortedData, setSortedData] = useState(data); // Use state for data
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Track sort order
  const [filteredData, setFilteredData] = useState(data); // Use state for filtered data
  const columnData = ["name", "roll", "View Details"];
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [parentsData, setParentsData] = useState([]);

  // Sort data based on column
  const sortData = (column) => {
    const isAscending =
      sortConfig.key === column && sortConfig.direction === "ascending";
    const direction = isAscending ? "descending" : "ascending";

    const sorted = [...sortedData].sort((a, b) => {
      if (a[column] < b[column]) return direction === "ascending" ? -1 : 1;
      if (a[column] > b[column]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortedData(sorted); // Update state
    setSortConfig({ key: column, direction }); // Update sort configuration
  };

  // Select all rows or specific rows
  const selectedRows = (selectedIndex = null) => {
    // Get the displayed data (filtered and sorted)
    const displayedRows = sortedData;

    // If a specific row is toggled (single row selection)
    if (selectedIndex !== null) {
      const selectedCheckbox = document.querySelectorAll(
        "input[type='checkbox']"
      )[selectedIndex + 1]; // +1 to skip the header checkbox
      const selectedRow = displayedRows[selectedIndex];

      // Update props with the selected student's email
      if (selectedCheckbox.checked) {
        props.setSelectedStudentsEmail((prev) => [...prev, selectedRow.Email]);
      } else {
        props.setSelectedStudentsEmail((prev) =>
          prev.filter((email) => email !== selectedRow.Email)
        );
      }
    } else {
      // If the header checkbox is toggled (select/deselect all)
      const headerCheckbox = document.querySelector(
        "input[type='checkbox']:first-of-type"
      );
      const isChecked = headerCheckbox.checked;

      // Select or deselect all visible rows
      const selectedEmails = isChecked
        ? displayedRows.map((row) => row.Email) // Add all visible emails
        : []; // Clear all selected emails

      // Update props
      props.setSelectedStudentsEmail(selectedEmails);

      // Check/uncheck individual row checkboxes
      const rowCheckboxes = document.querySelectorAll(
        "input[type='checkbox']:not(:first-of-type)"
      );
      rowCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
    }
  };

  // Filter data based on marks and attendance
  const filterData = (data, filterParams) => {
    // Destructure filterParams for easier access
    const { test, marks, attendance } = filterParams;

    // Check if marks or attendance filters are meaningful
    const isMarksFilterActive = marks?.from || marks?.to;
    const isAttendanceFilterActive = attendance?.from || attendance?.to;

    // If neither marks nor attendance filters are active, return the original data
    if (!isMarksFilterActive && !isAttendanceFilterActive) {
      return data;
    }

    // Filter the data based on active filters
    return data.filter((row) => {
      let matches = true;

      // Apply marks filter if active
      if (isMarksFilterActive) {
        const marksFrom = parseInt(marks.from) || Number.NEGATIVE_INFINITY;
        const marksTo = parseInt(marks.to) || Number.POSITIVE_INFINITY;

        // filter based on test
        const testValue = row[test];
        if (isNaN(testValue) || testValue < marksFrom || testValue > marksTo) {
          matches = false;
        }
      }

      // Apply attendance filter if active
      if (isAttendanceFilterActive) {
        const attendanceFrom =
          parseInt(attendance.from) || Number.NEGATIVE_INFINITY;
        const attendanceTo =
          parseInt(attendance.to) || Number.POSITIVE_INFINITY;

        const attendanceValue = parseInt(row.Attendance);
        if (
          isNaN(attendanceValue) ||
          attendanceValue < attendanceFrom ||
          attendanceValue > attendanceTo
        ) {
          matches = false;
        }
      }

      return matches;
    });
  };

  useEffect(() => {
    const filtered = filterData(data, filterParams);
    setFilteredData(filtered);
  }, [data, filterParams]);

  useEffect(() => {
    setSortedData(filteredData);
  }, [filteredData]);

  console.log("parentsData", parentsData);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onClick={() => {
                selectedRows();
              }}
              checked={
                sortedData.length > 0 &&
                sortedData.every((row) =>
                  props.selectedStudentsEmail.includes(row.Email)
                )
              }
            />
          </th>
          {columns.map((column, index) => (
            <th key={index}>
              <span>{column}</span>
              <BiSort
                style={{ cursor: "pointer" }}
                onClick={() => sortData(column)} // Call sorting on click
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <>
            <tr key={rowIndex}>
              <td>
                <input
                  type="checkbox"
                  onClick={() => {
                    selectedRows(rowIndex);
                  }}
                  checked={props.selectedStudentsEmail.includes(row.Email)}
                />
              </td>
              {columnData.map((column, index) => (
                <td key={index}>
                  {column === "View Details" ? (
                    <span
                      onClick={() => {
                        setExpandedRowIndex(
                          expandedRowIndex === rowIndex ? null : rowIndex
                        );
                      }}
                      className="view-more-btn"
                    >
                      {expandedRowIndex === rowIndex ? "Hide" : "View More"}
                    </span>
                  ) : (
                    row[column]
                  )}
                </td>
              ))}
            </tr>
            <tr
              className={`view-more-row ${
                expandedRowIndex === rowIndex ? "show" : "hide"
              }`}
            >
              <td colSpan={columns.length + 1}>
                <div className="view-more-row-data">
                  <div className="view-more-row-data-item">
                    <div>
                      <span>CGPA</span>: {row?.academics?.cgpa}
                    </div>
                    <div>
                      <span>Last Semester SGPA</span>: {row?.academics?.sgpa}
                    </div>
                    <div>
                      <span>Backlogs</span>: {row?.academics?.backlog}
                    </div>
                    <div>
                      <span>Total Credits</span>: {row?.academics?.credits}
                    </div>
                  </div>
                  <div className="view-more-row-data-table">
                    <span>Subjects</span>
                    <table>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Subject</th>
                          <th>Subject Code</th>
                          <th>Attendance</th>
                          <th>T1(15)</th>
                          <th>T2(25)</th>
                          <th>T3(35)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {row?.subjects?.map((subject, index) => (
                          <tr>
                            <td>{subject?.subjectNo}</td>
                            <td>{subject?.subjectName}</td>
                            <td>{subject?.subjectCode}</td>
                            <td>{subject?.attendance}</td>
                            <td>
                              {subject?.marks?.find((mark) => mark.testNo === 1)
                                ?.score || "-"}
                            </td>
                            <td>
                              {subject?.marks?.find((mark) => mark.testNo === 2)
                                ?.score || "-"}
                            </td>
                            <td>
                              {subject?.marks?.find((mark) => mark.testNo === 3)
                                ?.score || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div>
                      <PrimaryButton
                        text="Send Mail to Parents"
                        onClick={() => {
                          setParentsData(row.parents);
                          console.log("Send Mail to Parents");
                        }}
                        style={{
                          fontSize: "14px",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
}
