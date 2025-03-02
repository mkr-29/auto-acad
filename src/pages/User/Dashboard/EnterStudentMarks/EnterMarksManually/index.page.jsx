import React, { useState } from "react";
import "../studentMarks.scss";
import { useFormik } from "formik";
import { UserServices } from "../../../Services/UserServices";

export default function EnterMarksManually() {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      rollNo: "",
    },
    onSubmit: (values) => {
      handleSubmit();
      formik.resetForm();
    },
  });

  const handleSubmit = async () => {
    if (formik.values.rollNo === "") {
      throw new Error("Roll Number is required");
    }

    const data = formik.values;

    setLoading(true);
    try {
      const response = await UserServices.getStudent(data);

      if (response.status >= 400) {
        throw new Error(response.message);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enter-marks-manually">
      <h3>Enter Marks Manually</h3>

      <form>
        <label htmlFor="rollNo">ROLL NUMBER</label>
        <input
          type="text"
          id="rollNo"
          name="rollNo"
          value={formik.values.rollNo}
          onChange={formik.handleChange}
        />

        <button
          type="submit"
          onClick={formik.handleSubmit}
          disabled={loading}
        >{loading ? "Submitting..." : "SUBMIT"}</button>
      </form>
    </div>
  );
}
