import React, { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import "./Table.scss";

export default function Table({ data, columns, filterParams, ...props }) {
  const [sortedData, setSortedData] = useState(data); // Use state for data
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Track sort order
  const [filteredData, setFilteredData] = useState(data); // Use state for filtered data

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
        {sortedData.map((row, index) => (
          <tr key={index}>
            <td>
              <input 
                type="checkbox" 
                onClick={()=>{
                  selectedRows(index);
                }} 
                checked={props.selectedStudentsEmail.includes(row.Email)}
              />
            </td>
            {columns.map((column, index) => (
              <td key={index}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
