import React, { useEffect, useState } from "react";
import "./ViewBatchDetails.scss";
import { MdFilterAlt } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import Popover from "../../../../Components/Popover/index.page";
import Modal from "../../../../Components/Modal/index.page";
import Table from "../../../../Components/Table/index.page";
import { StudentService } from "../../Services/StudentService";
import { toast } from "react-toastify";
import { getUserId } from "../../Utils/helper";

export default function ViewBatchDetails() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterParams, setFilterParams] = useState({
    test: "",
    marks: { from: "", to: "" },
    attendance: { from: "", to: "" },
  });
  const [selectedStudentsEmail, setSelectedStudentsEmail] = useState([]);
  const userId = getUserId();

  const getStudents = async () => {
    try {
      const response = await StudentService.getStudentsByUserId(userId);

      if (response.success) {
        console.log("students", response.data);
      } else {
        toast.error(response.message);
        console.error("Error Message:", response.message);
      }
    } catch (error) {
      console.error("Error Message:", error.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const data = [
    {
      "Student Name": "John Doe",
      "Roll Number": "CS77A001",
      T1: "90",
      T2: "75",
      T3: "83",
      Attendance: "90",
      Email: "mayank.k9802@gmail.com",
    },
    {
      "Student Name": "Jane Doe",
      "Roll Number": "CS77A002",
      T1: "85",
      T2: "40",
      T3: "75",
      Attendance: "50",
      Email: "211317@juitsolan.in",
    },
    {
      "Student Name": "John Smith",
      "Roll Number": "CS77A003",
      T1: "30",
      T2: "85",
      T3: "60",
      Attendance: "70",
      Email: "mayank.kumar9802@gmail.com",
    },
    {
      "Student Name": "Jane Smith",
      "Roll Number": "CS77A004",
      T1: "75",
      T2: "84",
      T3: "48",
      Attendance: "60",
      Email: "211314@juitsolan.in",
    },
    {
      "Student Name": "John Wick",
      "Roll Number": "CS77A005",
      T1: "70",
      T2: "25",
      T3: "50",
      Attendance: "30",
      Email: "211262@juitsolan.in",
    },
  ];
  const columns = [
    "Student Name",
    "Roll Number",
    "T1",
    "T2",
    "T3",
    "Attendance",
    "Email",
  ];

  const filterContent = (
    <div className="filter">
      <div className="filter-marks">
        <label>On basis of marks: </label>
        <div className="filter-test">
          <span>Select Test: </span>
          <select
            value={filterParams.test}
            onChange={(e) =>
              setFilterParams({ ...filterParams, test: e.target.value })
            }
          >
            <option value="">Select</option>
            <option value="T1">T1</option>
            <option value="T2">T2</option>
            <option value="T3">T3</option>
          </select>
        </div>
        <div className="filter-range">
          <span>Select marks range: </span>
          <input
            type="number"
            placeholder="From"
            value={filterParams.marks.from}
            onChange={(e) =>
              setFilterParams({
                ...filterParams,
                marks: { ...filterParams.marks, from: e.target.value },
              })
            }
          />
          <span> to </span>
          <input
            type="number"
            placeholder="To"
            value={filterParams.marks.to}
            onChange={(e) =>
              setFilterParams({
                ...filterParams,
                marks: { ...filterParams.marks, to: e.target.value },
              })
            }
            // if from has value and to is empty then make to required
          />
        </div>
      </div>
      <div className="filter-attendance">
        <label>On basis of attendance: </label>
        <div className="filter-range">
          <span>Select attendance range: </span>
          <input
            type="number"
            placeholder="From"
            value={filterParams.attendance.from}
            onChange={(e) =>
              setFilterParams({
                ...filterParams,
                attendance: {
                  ...filterParams.attendance,
                  from: e.target.value,
                },
              })
            }
          />
          <span> to </span>
          <input
            type="number"
            placeholder="To"
            value={filterParams.attendance.to}
            onChange={(e) =>
              setFilterParams({
                ...filterParams,
                attendance: { ...filterParams.attendance, to: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );

  console.log("selectedStudentsEmail", selectedStudentsEmail);

  return (
    <div className="view-batch">
      <h3 className="view-batch-head">View Batch Details</h3>
      <div className="view-batch-details-box">
        <div className="view-batch-details">
          <label>Batch Number: </label>
          <span>{"CS77"}</span>
        </div>
        <div className="view-batch-details">
          <label>Number of Students: </label>
          <span>{"5"}</span>
        </div>
        <MdFilterAlt
          className="view-batch-filter"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        />
        <Popover
          icon={<FiMenu />}
          content={
            <div className="view-batch-menu-content">
              <Link
                to="/user/send-mail-to-student"
                className="view-batch-menu-item"
              >
                Send Mail to Student
              </Link>
              <div className="view-batch-menu-item">Send Mail to Parent</div>
            </div>
          }
        />
      </div>
      <div className="query">
        {`Query: ${filterParams.test ? `Test: ${filterParams.test},` : ""} ${
          filterParams.marks.from ? `Marks > ${filterParams.marks.from},` : ""
        }
        ${filterParams.marks.to ? `Marks < ${filterParams.marks.to},` : ""} 
        ${
          filterParams.attendance.from
            ? `Attendance > ${filterParams.attendance.from},`
            : ""
        }
        ${
          filterParams.attendance.to
            ? `Attendance < ${filterParams.attendance.to},`
            : ""
        }`}
      </div>
      {isFilterOpen && (
        <Modal
          isModalOpen={isFilterOpen}
          setIsModalOpen={setIsFilterOpen}
          title={`Filter Data`}
          content={filterContent}
          primaryButton={{
            text: "Filter",
            onClick: () => {
              setIsFilterOpen(false);
            },
          }}
          onCancel={() => {
            setFilterParams({
              test: "",
              marks: { from: "", to: "" },
              attendance: { from: "", to: "" },
            });
            setIsFilterOpen(false);
          }}
        />
      )}
      <div className="view-batch-table">
        <Table
          data={data}
          columns={columns}
          filterParams={filterParams}
          selectedStudentsEmail={selectedStudentsEmail}
          setSelectedStudentsEmail={setSelectedStudentsEmail}
        />
      </div>
    </div>
  );
}
