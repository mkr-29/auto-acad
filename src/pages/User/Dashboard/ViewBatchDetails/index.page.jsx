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
import Pagination from "../../../../Components/Pagination/index.page";

export default function ViewBatchDetails() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterParams, setFilterParams] = useState({
    test: "",
    marks: { from: "", to: "" },
    attendance: { from: "", to: "" },
  });
  const [selectedStudentsEmail, setSelectedStudentsEmail] = useState([]);
  const userId = getUserId();
  const [studentsList, setStudentsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getStudents = async (page = 1, limit = 10) => {
    const params = {
      page,
      limit,
    };
    try {
      const response = await StudentService.getStudentsByUserId(userId, params);

      if (response.success) {
        setStudentsList(response.data);
        setCurrentPage(response.pagination.page);
        setTotalPages(response.pagination.totalPages);
      } else {
        toast.error(response.message);
        console.error("Error Message:", response.message);
      }
    } catch (error) {
      console.error("Error Message:", error.message);
    }
  };

  const columns = [
    "Student Name",
    "Roll Number",
    "",
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

  useEffect(() => {
    getStudents();
  }, [
    // eslint-disable-next-line
    userId,
  ]);

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
          data={studentsList}
          columns={columns}
          filterParams={filterParams}
          selectedStudentsEmail={selectedStudentsEmail}
          setSelectedStudentsEmail={setSelectedStudentsEmail}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={() => getStudents(currentPage + 1, 10)}
          onPreviousPage={() => getStudents(currentPage - 1, 10)}
        />
      </div>
    </div>
  );
}
