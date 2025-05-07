import React from "react";
import { toast } from "react-toastify";
import { StudentService } from "../../../Services/StudentService";
import { useFormik } from "formik";

const CollegeDataForm = ({
  setLoading,
  loading,
  setSubmitPayload,
  setStep,
}) => {
  const formik = useFormik({
    initialValues: {
      collegeData: {
        roll: "",
        instituteCode: "",
        academicYear: "",
        program: "",
        branch: "",
        batch: "",
        semester: "",
        year: "",
        hostelName: "",
        hostelNo: "",
        room: "",
      },
    },
    onSubmit: (values) => {
      addCollege();
    },
  });
  // Add student's college data to database
  const addCollege = async () => {
    const payload = formik.values.collegeData;

    // Validate: Ensure all fields have values
    const isPayloadValid = Object.values(payload).every(
      (value) => value !== "" && value !== null && value !== undefined
    );

    if (!isPayloadValid) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Validate academic year format (YYYY-YYYY)
    const academicYear = payload.academicYear;
    const academicYearRegex = /^\d{4}-\d{4}$/;
    
    if (!academicYearRegex.test(academicYear)) {
      toast.error("Academic year must be in the format YYYY-YYYY");
      return;
    }
    
    // Additional validation: check if the second year is one more than the first year
    const [firstYear, secondYear] = academicYear.split('-').map(Number);
    if (secondYear !== firstYear + 1) {
      toast.error("Invalid academic year format. The second year should be one year after the first year.");
      return;
    }

    // Validate batch format (YYYY)
    const batch = payload.batch;
    const batchRegex = /^\d{4}$/;
    if (!batchRegex.test(batch)) {
      toast.error("Batch must be in the format YYYY");
      return;
    }
    
    setLoading(true);

    try {
      const response = await StudentService.addCollege(payload);

      const { data, success } = response;
      if (success) {
        setSubmitPayload((prev) => ({
          ...prev,
          studentData: {
            ...prev.studentData,
            collegeData: data,
          },
        }));
        setStep(2);
        return response;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error adding college!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 style={{ color: "white" }}>College Data</h4>
      <div>
        <div className="form-group">
          <label htmlFor="roll">Roll Number</label>
          <input
            type="number"
            id="roll"
            name="collegeData.roll"
            value={
              formik.values.collegeData.roll === 0
                ? ""
                : formik.values.collegeData.roll
            }
            onChange={(e) => {
              let value = Number(e.target.value);

              // Restrict value to max 999999 and min 100
              if (value <= 999999) {
                formik.setFieldValue("collegeData.roll", value);
              } else if (value < 100) {
                formik.setFieldValue("collegeData.roll", ""); // Reset to empty if less than 100
              }
            }}
            placeholder="Enter student roll number"
            min={100}
            max={999999}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instituteCode">Institution Code</label>
          <input
            type="text"
            id="instituteCode"
            name="collegeData.instituteCode"
            value={formik.values.collegeData.instituteCode}
            onChange={formik.handleChange}
            placeholder="Enter institution code"
            maxLength={6}
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="academicYear">Academic Year</label>
          <input
            type="text"
            id="academicYear"
            name="collegeData.academicYear"
            value={formik.values.collegeData.academicYear}
            onChange={formik.handleChange}
            placeholder="Enter academic year"
            maxLength={9}
          />
        </div>
        <div className="form-group">
          <label htmlFor="program">Program</label>
          <input
            type="text"
            id="program"
            name="collegeData.program"
            value={formik.values.collegeData.program}
            onChange={formik.handleChange}
            placeholder="Enter program"
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            id="branch"
            name="collegeData.branch"
            value={formik.values.collegeData.branch}
            onChange={formik.handleChange}
            placeholder="Enter branch"
          />
        </div>
        <div className="form-group">
          <label htmlFor="batch">Batch</label>
          <input
            type="text"
            id="batch"
            name="collegeData.batch"
            value={formik.values.collegeData.batch}
            onChange={formik.handleChange}
            placeholder="Enter batch"
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="semester">Semester</label>
          <input
            type="number"
            id="semester"
            name="collegeData.semester"
            value={
              formik.values.collegeData.semester === 0
                ? ""
                : formik.values.collegeData.semester
            }
            onChange={(e) => {
              let value = Number(e.target.value);

              // Restrict value to max 8 and min 1
              if (value >= 1 && value <= 8) {
                formik.setFieldValue("collegeData.semester", value);
              } else if (value < 1) {
                formik.setFieldValue("collegeData.semester", ""); // Reset to empty if less than 1
              }

              // Auto-set year based on semester
              if (value === 1 || value === 2) {
                formik.setFieldValue("collegeData.year", 1);
              } else if (value === 3 || value === 4) {
                formik.setFieldValue("collegeData.year", 2);
              } else if (value === 5 || value === 6) {
                formik.setFieldValue("collegeData.year", 3);
              } else if (value === 7 || value === 8) {
                formik.setFieldValue("collegeData.year", 4);
              }
            }}
            placeholder="Enter semester"
            min={1}
            max={8}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="collegeData.year"
            value={
              formik.values.collegeData.year === 0
                ? ""
                : formik.values.collegeData.year
            }
            onChange={(e) => {
              let value = Number(e.target.value);

              // Restrict value to max 4 and min 1
              if (value >= 1 && value <= 4) {
                formik.setFieldValue("collegeData.year", value);
              } else if (value < 1) {
                formik.setFieldValue("collegeData.year", ""); // Reset to empty if less than 1
              }
            }}
            placeholder="Enter year"
            min={1}
            max={4}
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="hostelName">Hostel Name</label>
          <input
            type="text"
            id="hostelName"
            name="collegeData.hostelName"
            value={formik.values.collegeData.hostelName}
            onChange={formik.handleChange}
            placeholder="Enter hostel name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hostelNo">Hostel Number</label>
          <input
            type="text"
            id="hostelNo"
            name="collegeData.hostelNo"
            value={formik.values.collegeData.hostelNo}
            onChange={formik.handleChange}
            placeholder="Enter hostel number"
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="room">Room Number</label>
          <input
            type="number"
            id="room"
            name="collegeData.room"
            value={
              formik.values.collegeData.room === 0
                ? ""
                : formik.values.collegeData.room
            }
            onChange={(e) => {
              let value = Number(e.target.value);

              // Restrict value to max 999 and min 1
              if (value >= 1 && value <= 999) {
                formik.setFieldValue("collegeData.room", value);
              } else if (value < 1) {
                formik.setFieldValue("collegeData.room", ""); // Reset to empty if less than 1
              }
            }}
            placeholder="Enter room number"
            min={1}
            max={999}
          />
        </div>
      </div>
      <button
        type="button"
        className="sign-in-box-inner-button"
        onClick={formik.handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "SUBMIT"}
      </button>
    </>
  );
};

export default CollegeDataForm;
