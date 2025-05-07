import React, { useEffect, useState } from "react";
import "./AddStudentToMentor.scss";
import { useFormik } from "formik";
import { StudentService } from "../../Services/StudentService";
import { toast } from "react-toastify";
import { validateFields } from "../../Utils/helper";
import PersonalDataForm from "./components/PersonalDataForm";
import CollegeDataForm from "./components/CollegeDataForm";
import AcademicDataForm from "./components/AcademicDataForm";
import ParentsDataForm from "./components/ParentsDataForm";

export default function AddStudentToMentor() {
  const [loading, setLoading] = useState(false);
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
      collegeData: "",
      academicData: {
        subjectCount: 0,
        sgpa: 0,
        cgpa: 0,
        backlog: 0,
        credits: 0,
        // add subjectsData array size as per subjectCount
        subjectsData: [],
      },
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
    onSubmit: (values) => {
      handleSubmit();
      // formik.resetForm();
    },
  });
  const [submitPayload, setSubmitPayload] = useState({
    studentData: {
      personalData: {},
      collegeData: "",
      academicsData: {},
      parentsData: ""
    }
  });
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState(1);

  // Get userId from localStorage
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user.userId);
    } else {
      toast.error("User not found!");
    }
  };

  // Submit student data to database
  const handleSubmit = async () => {
    console.log("payload", submitPayload);
    const newPayload = submitPayload;
    console.log("newPayload1", newPayload);

    newPayload.userId = userId;
    console.log("newPayload2", newPayload);

    if (!userId) {
      toast.error("User not found!");
      return;
    }


    if (!newPayload.studentData.collegeData) {
      toast.error("College data is required!");
      return;
    }

    if (!newPayload.studentData.parentsData) {
      toast.error("Parents data is required!");
      return;
    }

    if (!newPayload.studentData.academicsData) {
      toast.error("Academic data is required!");
      return;
    }

    if (!newPayload.studentData.personalData) {
      toast.error("Personal data is required!");
      return;
    }
    
    setLoading(true);

    try {
      const response = await StudentService.addStudent(newPayload);
      
      if (!response.success) {
        if (response.message === "Validation error.") {
          toast.success("Student added!");
        } else {
          toast.error(response.message || "Failed to add student");
          throw new Error(response.message || "Failed to add student");
        }
      } else {
        toast.success("Student added successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred while adding the student");
    } finally {
      setLoading(false);
      formik.resetForm();
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (step === 5) {
      formik.handleSubmit();
      setStep(1);
    }
  }, [submitPayload, step]);

  // console.log("formik", formik.values);

  return (
    <div className="add-student">
      <h3>Add Student to Mentor</h3>
      <form>
        {step === 1 && (
          <CollegeDataForm
            loading={loading}
            setLoading={setLoading}
            setSubmitPayload={setSubmitPayload}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <PersonalDataForm
            setStep={setStep}
            loading={loading}
            setLoading={setLoading}
            setSubmitPayload={setSubmitPayload}
          />
        )}
        {step === 3 && (
          <AcademicDataForm
            loading={loading}
            setLoading={setLoading}
            submitPayload={submitPayload}
            setSubmitPayload={setSubmitPayload}
            setStep={setStep}
          />
        )}
        {step === 4 && (
          <ParentsDataForm
            loading={loading}
            setLoading={setLoading}
            submitPayload={submitPayload}
            setSubmitPayload={setSubmitPayload}
            setStep={setStep}
          />
        )}

        {/* <button
          type="button"
          className="sign-in-box-inner-button"
          onClick={formik.handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "SUBMIT"}
        </button> */}
      </form>
    </div>
  );
}
