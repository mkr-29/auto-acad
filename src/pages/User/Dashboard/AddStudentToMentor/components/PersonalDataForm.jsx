import { useFormik } from "formik";
import React from "react";

const PersonalDataForm = ({
  loading,
  // setLoading,
  setSubmitPayload,
  setStep,
}) => {
  const formik = useFormik({
    initialValues: {
      personalData: {
        name: "",
        dob: "",
        bloodGroup: "",
        gender: "",
        nationality: "",
        category: "",
      },
    },
    onSubmit: (values) => {
      setSubmitPayload((prev) => ({
        ...prev,
        studentData: {
          ...prev.studentData,
          personalData: values.personalData,
        },
      }));
      setStep(3);
    },
  });

  return (
    <>
      <h4 style={{ color: "white" }}>Personal Data</h4>
      <div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="personalData.name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter student name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="personalData.dob"
            value={formik.values.dob}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const today = new Date();
              const minAgeDate = new Date();
              minAgeDate.setFullYear(today.getFullYear() - 16); // Set minimum date (16 years ago)

              if (selectedDate <= minAgeDate) {
                formik.setFieldValue("personalData.dob", e.target.value); // Allow valid date
              } else {
                alert("Student must be at least 16 years old.");
                formik.setFieldValue("personalData.dob", ""); // Clear invalid date
              }
            }}
            max={
              new Date(new Date().setFullYear(new Date().getFullYear() - 16))
                .toISOString()
                .split("T")[0]
            } // Restrict selection to 16 years ago
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <input
            type="text"
            id="bloodGroup"
            name="personalData.bloodGroup"
            value={formik.values.bloodGroup}
            onChange={(e) => {
              const { value } = e.target;
              const formattedValue = value
                .toUpperCase()
                .replace(/[^A-BO+-]/g, ""); // Allow only valid characters
              const validBloodGroups = [
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
                "",
              ]; // Include empty string for clearing input

              if (
                validBloodGroups.some((bg) => bg.startsWith(formattedValue))
              ) {
                formik.setFieldValue("personalData.bloodGroup", formattedValue);
              }
            }}
            placeholder="Enter blood group"
            maxLength={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="personalData.gender"
            value={formik.values.gender}
            onChange={(e) => {
              const { value } = e.target;
              if (["M", "F", "O", ""].includes(value.toUpperCase())) {
                formik.setFieldValue(
                  "personalData.gender",
                  value.toUpperCase()
                );
              }
            }}
            placeholder="Enter gender"
            maxLength={1}
          />
        </div>
      </div>
      <div>
        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            name="personalData.nationality"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            placeholder="Enter nationality"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="personalData.category"
            value={formik.values.category}
            onChange={(e) => {
              const { value } = e.target;
              if (
                [
                  "GEN",
                  "OBC",
                  "SC",
                  "ST",
                  "G",
                  "GE",
                  "O",
                  "OB",
                  "S",
                  "",
                ].includes(value.toUpperCase())
              ) {
                formik.setFieldValue(
                  "personalData.category",
                  value.toUpperCase()
                );
              }
            }}
            placeholder="Enter category"
            maxLength={3}
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

export default PersonalDataForm;
