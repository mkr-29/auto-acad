import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { StudentService } from "../../../Services/StudentService";

export default function ParentsDataForm({
  loading,
  setLoading,
  submitPayload,
  setSubmitPayload,
  setStep,
}) {
  const formik = useFormik({
    initialValues: {
      parentsData: {
        father: {
          name: "",
          occupation: "",
          phone: "",
          email: "",
        },
        mother: {
          name: "",
          occupation: "",
          phone: "",
          email: "",
        },
      },
    },
    onSubmit: () => {
      addParents();
    },
  });

  // Add student's parents data to database
  const addParents = async () => {
    const payload = formik.values.parentsData;

    // Validate: Ensure all fields have values
    const isPayloadValid = Object.values(payload).every((parent) =>
      Object.values(parent).every(
        (value) => value !== "" && value !== null && value !== undefined
      )
    );

    if (!isPayloadValid) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await StudentService.addParents(payload);

      const { data, success } = response;
      if (success === true) {
        setSubmitPayload((prev) => ({
          ...prev,
          studentData: {
            ...prev.studentData,
            parentsData: data,
          },
        }));
        setStep(5);
        toast.success("Parents data added successfully!");
        return response;
      } else {
        toast.error(response.message || "Failed to add parents data");
        return response;
      }
    } catch (error) {
      console.error("Error adding parents:", error);
      toast.error("Error adding parents data!");
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 style={{ color: "white" }}>Parents Data</h4>
      <div>
        <div className="form-group">
          <label htmlFor="fatherName">Father's Name</label>
          <input
            type="text"
            id="fatherName"
            name="parentsData.father.name"
            value={formik.values.parentsData.father.name}
            onChange={formik.handleChange}
            placeholder="Enter father's name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fatherOccupation">Father's Occupation</label>
          <input
            type="text"
            id="fatherOccupation"
            name="parentsData.father.occupation"
            value={formik.values.parentsData.father.occupation}
            onChange={formik.handleChange}
            placeholder="Enter father's occupation"
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="fatherPhone">Father's Phone</label>
          <input
            type="text"
            id="fatherPhone"
            name="parentsData.father.phone"
            value={formik.values.parentsData.father.phone}
            onChange={formik.handleChange}
            placeholder="Enter father's phone"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fatherEmail">Father's Email</label>
          <input
            type="email"
            id="fatherEmail"
            name="parentsData.father.email"
            value={formik.values.parentsData.father.email}
            onChange={formik.handleChange}
            placeholder="Enter father's email"
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="motherName">Mother's Name</label>
          <input
            type="text"
            id="motherName"
            name="parentsData.mother.name"
            value={formik.values.parentsData.mother.name}
            onChange={formik.handleChange}
            placeholder="Enter mother's name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="motherOccupation">Mother's Occupation</label>
          <input
            type="text"
            id="motherOccupation"
            name="parentsData.mother.occupation"
            value={formik.values.parentsData.mother.occupation}
            onChange={formik.handleChange}
            placeholder="Enter mother's occupation"
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="motherPhone">Mother's Phone</label>
          <input
            type="text"
            id="motherPhone"
            name="parentsData.mother.phone"
            value={formik.values.parentsData.mother.phone}
            onChange={formik.handleChange}
            placeholder="Enter mother's phone"
          />
        </div>
        <div className="form-group">
          <label htmlFor="motherEmail">Mother's Email</label>
          <input
            type="email"
            id="motherEmail"
            name="parentsData.mother.email"
            value={formik.values.parentsData.mother.email}
            onChange={formik.handleChange}
            placeholder="Enter mother's email"
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
}
