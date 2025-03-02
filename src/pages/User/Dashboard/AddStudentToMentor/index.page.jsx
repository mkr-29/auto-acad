import React, { useState } from "react";
import "./AddStudentToMentor.scss";
import { useFormik } from "formik";
import { StudentService } from "../../Services/StudentService";
import { toast } from "react-toastify";

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
      collegeData: {
        roll: 0,
        instituteCode: "",
        academicYear: "",
        program: "",
        branch: "",
        batch: "",
        semester: 0,
        year: 0,
        hostelName: "",
        hostelNo: "",
        room: 0,
      },
      collegeId: "",
      academicData: {
        subjectCount: 0,
        sgpa: 0,
        cgpa: 0,
        backlog: 0,
        credits: 0,
        // add subjectData array size as per subjectCount
        subjectData: [],
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

    setLoading(true);

    try {
      const response = await StudentService.addCollege(payload);

      const { data, success, message } = response;
      console.log("data", data);
      if (success) {
        formik.setFieldValue("collegeId", data);
        toast.success("Success: " + message);
      } else {
        toast.error("Error: " + message);
      }
    } catch (error) {
      toast.error("Error adding college!");
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async (subjectData, i) => {
    const payload = subjectData;

    // Validate: Ensure all fields have values
    const isPayloadValid = Object.values(payload).every(
      (value) => value !== "" && value !== null && value !== undefined
    );

    if (!isPayloadValid) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await StudentService.addSubject(payload);

      const { data, success, message } = response;
      if (success) {
        formik.setFieldValue(`subjectData[${i}].subjectId`, data);
        toast.success("Success: " + message);
      } else {
        toast.error("Error: " + message);
      }
    } catch (error) {
      toast.error("Error adding subjects!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      studentData: {
        personalData: formik.values.personalData,
        collegeId: formik.values.collegeId,
        academicData: formik.values.academicData,
        parentsData: formik.values.parentsData,
      },
    };

    console.log("payload", payload);

    // const isPayloadValid = Object.values(payload.studentData).every(
    //   (value) => value !== "" && value !== null && value !== undefined
    // );

    // if (!isPayloadValid) {
    //   toast.warning("Please fill all required fields.");
    //   return;
    // }

    setLoading(true);

    try {
      addCollege();
      if (!formik.values.collegeId) {
        throw new Error("College not added");
      }
      if (formik.values.academicData.subjectCount > 0) {
        for (let i = 0; i < formik.values.academicData.subjectCount; i++) {
          addSubject(formik.values.academicData.subjectData[i], i);
        }
      }
      payload.collegeId = formik.values.collegeId;
      const response = await StudentService.addStudent(payload);
      if (response.status >= 400) {
        throw new Error(response.message);
      } else {
        // alert("Student added successfully");
        toast.success("Student added successfully");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        alert(
          `Error: ${error.response.status} - ${
            error.response.data.message || "Unauthorized"
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  console.log("formik.values", formik.values);

  return (
    <div className="add-student">
      <h3>Add Student to Mentor</h3>
      <form>
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="personalData.name"
              value={formik.values.personalData.name}
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
              value={formik.values.personalData.dob}
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
              value={formik.values.personalData.bloodGroup}
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
                  formik.setFieldValue(
                    "personalData.bloodGroup",
                    formattedValue
                  );
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
              value={formik.values.personalData.gender}
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
              value={formik.values.personalData.nationality}
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
              value={formik.values.personalData.category}
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
          <div className="form-group">
            <label htmlFor="subjectCount">Number of Subjects</label>
            <input
              type="number"
              id="subjectCount"
              name="academicData.subjectCount"
              value={
                formik.values.academicData.subjectCount === 0
                  ? ""
                  : formik.values.academicData.subjectCount
              }
              onChange={(e) => {
                let value = Number(e.target.value);

                // Restrict value to max 10 and min 1
                if (value >= 1 && value <= 10) {
                  formik.setFieldValue("academicData.subjectCount", value);
                } else if (value < 1) {
                  formik.setFieldValue("academicData.subjectCount", ""); // Reset to empty if less than 1
                }
              }}
              placeholder="Enter number of subjects"
              min={1}
              max={10}
            />
          </div>
        </div>
        {/* Add subjectData fields as per subjectCount */}
        {formik.values.academicData.subjectCount > 0 &&
          Array.from({ length: formik.values.academicData.subjectCount }).map(
            (_, index) => (
              <>
                <div key={index}>
                  <div className="form-group">
                    <label htmlFor={`subject${index + 1}name`}>
                      Subject [{index + 1}] Name
                    </label>
                    <input
                      type="text"
                      id={`subject${index + 1}name`}
                      name={`academicData.subjectData[${index}]name`}
                      value={
                        formik.values.academicData.subjectData[index]
                          ?.subjectName || ""
                      }
                      onChange={(e) => {
                        const { value } = e.target;
                        formik.setFieldValue(
                          `academicData.subjectData[${index}].subjectName`,
                          value
                        );
                      }}
                      placeholder={`Enter subject ${index + 1} name`}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`subject${index + 1}code`}>
                      Subject [{index + 1}] Code
                    </label>
                    <input
                      type="text"
                      id={`subject${index + 1}code`}
                      name={`academicData.subjectData[${index}]code`}
                      value={
                        formik.values.academicData.subjectData[index]
                          ?.subjectCode || ""
                      }
                      onChange={(e) => {
                        const { value } = e.target;
                        formik.setFieldValue(
                          `academicData.subjectData[${index}].subjectCode`,
                          value
                        );
                      }}
                      placeholder={`Enter subject ${index + 1} code`}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor={`subject${index + 1}faculty`}>
                      Subject [{index + 1}] Faculty
                    </label>
                    <input
                      type="text"
                      id={`subject${index + 1}faculty`}
                      name={`academicData.subjectData[${index}]faculty`}
                      value={
                        formik.values.academicData.subjectData[index]
                          ?.subjectFaculty || ""
                      }
                      onChange={(e) => {
                        const { value } = e.target;
                        formik.setFieldValue(
                          `academicData.subjectData[${index}].subjectFaculty`,
                          value
                        );
                      }}
                      placeholder={`Enter subject ${index + 1} faculty`}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`subjects${index + 1}credits`}>
                      Subject [{index + 1}] Credits
                    </label>
                    <input
                      type="number"
                      id={`subjects${index + 1}credits`}
                      name={`academicData.subjectData[${index}]credits`}
                      value={
                        formik.values.academicData.subjectData[index]
                          ?.credits || ""
                      }
                      onChange={(e) => {
                        let value = Number(e.target.value);

                        // Restrict value to max 10 and min 0
                        if (value >= 0 && value <= 10) {
                          formik.setFieldValue(
                            `academicData.subjectData[${index}].credits`,
                            value
                          );
                        } else if (value < 0) {
                          formik.setFieldValue(
                            `academicData.subjectData[${index}].credits`,
                            "" // Reset to empty if less than 0
                          );
                        }
                      }}
                      placeholder="Enter subject credits"
                      min={0}
                      max={10}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor={`subject${index + 1}type`}>
                      Subject [{index + 1}] Type
                    </label>
                    <input
                      type="text"
                      id={`subject${index + 1}type`}
                      name={`academicData.subjectData[${index}]type`}
                      value={
                        formik.values.academicData.subjectData[index]
                          ?.subjectType || ""
                      }
                      onChange={(e) => {
                        const { value } = e.target;
                        formik.setFieldValue(
                          `academicData.subjectData[${index}].subjectType`,
                          value
                        );
                      }}
                      placeholder={`Enter subject ${index + 1} type`}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`subject${index + 1}attendance`}>
                      Subject [{index + 1}] Attendance
                    </label>
                    <input
                      type="number"
                      id={`subject${index + 1}attendance`}
                      name={`academicData.subjectData[${index}]attendance`}
                      value={
                        formik.values.academicData.subjectData[index]
                          ?.attendance || ""
                      }
                      onChange={(e) => {
                        let value = Number(e.target.value);

                        // Restrict value to max 100 and min 0
                        if (value >= 0 && value <= 100) {
                          formik.setFieldValue(
                            `academicData.subjectData[${index}].attendance`,
                            value
                          );
                        } else if (value < 0) {
                          formik.setFieldValue(
                            `academicData.subjectData[${index}].attendance`,
                            "" // Reset to empty if less than 0
                          );
                        }
                      }}
                      placeholder="Enter subject attendance"
                      min={0}
                      max={100}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor={`subject${index + 1}noOfTests`}>
                      Subject [{index + 1}] No. Of Tests
                    </label>
                    <input
                      type="number"
                      id={`subject${index + 1}noOfTests`}
                      name={`academicData.subjectData[${index}]noOfTests`}
                      value={
                        formik.values.academicData.subjectData[index]
                          ?.noOfTests || ""
                      }
                      onChange={(e) => {
                        let value = Number(e.target.value);

                        // Restrict value to max 10 and min 0
                        if (value >= 0 && value <= 10) {
                          formik.setFieldValue(
                            `academicData.subjectData[${index}].noOfTests`,
                            value
                          );
                        } else if (value < 0) {
                          formik.setFieldValue(
                            `academicData.subjectData[${index}].noOfTests`,
                            "" // Reset to empty if less than 0
                          );
                        }
                      }}
                      placeholder="Enter no. of tests"
                      min={0}
                      max={10}
                    />
                  </div>
                  {formik.values.academicData.subjectData[index]?.noOfTests >
                    0 && (
                    <div className="form-group">
                      <label htmlFor={`subject${index + 1}test1marks`}>
                        Subject [{index + 1}] Test [1] Marks
                      </label>
                      <input
                        type="number"
                        id={`subject${index + 1}test1marks`}
                        name={`academicData.subjectData[${index}].marks[0].score`}
                        value={
                          formik.values.academicData?.subjectData[index]
                            ?.marks?.[0]?.score || ""
                        }
                        onChange={(e) => {
                          let value = Number(e.target.value);

                          if (
                            !formik.values.academicData.subjectData[index]
                              ?.marks
                          ) {
                            formik.setFieldValue(
                              `academicData.subjectData[${index}].marks`,
                              []
                            );
                          }

                          // Restrict value between 0 and 100
                          if (value >= 0 && value <= 100) {
                            formik.setFieldValue(
                              `academicData.subjectData[${index}].marks[0]`,
                              { score: value, testNo: 1 }
                            );
                          } else if (value < 0) {
                            formik.setFieldValue(
                              `academicData.subjectData[${index}].marks[0]`,
                              { score: null, testNo: 1 }
                            );
                          }
                        }}
                        placeholder="Enter test [1] marks"
                        min={0}
                        max={100}
                      />
                    </div>
                  )}
                </div>
                {formik.values.academicData.subjectData[index]?.noOfTests > 1 &&
                  Array.from({
                    length:
                      formik.values.academicData.subjectData[index]?.noOfTests -
                      1,
                  })
                    .reduce((acc, _, testIndex) => {
                      // Group every two test fields inside a single div
                      if (testIndex % 2 === 0) {
                        acc.push([]);
                      }
                      acc[acc.length - 1].push(testIndex + 2); // Test numbers start from 2
                      return acc;
                    }, [])
                    .map((testGroup, testGroupIndex) => (
                      <div key={testGroupIndex} className="test-group">
                        {testGroup.map((testNum) => (
                          <div key={testNum} className="form-group">
                            <label
                              htmlFor={`subject${index + 1}test${testNum}marks`}
                            >
                              Subject [{index + 1}] Test [{testNum}] Marks
                            </label>
                            <input
                              type="number"
                              id={`subject${index + 1}test${testNum}marks`}
                              name={`academicData.subjectData[${index}].test${testNum}Marks`}
                              value={
                                formik.values.academicData.subjectData[index]
                                  ?.marks?.[testNum - 1]?.score || ""
                              }
                              onChange={(e) => {
                                let value = Number(e.target.value);

                                // Restrict value between 0 and 100
                                if (value >= 0 && value <= 100) {
                                  formik.setFieldValue(
                                    `academicData.subjectData[${index}].marks[${
                                      testNum - 1
                                    }].score`,
                                    value
                                  );
                                  formik.setFieldValue(
                                    `academicData.subjectData[${index}].marks[${
                                      testNum - 1
                                    }].testNo`,
                                    testNum
                                  );
                                } else if (value < 0) {
                                  formik.setFieldValue(
                                    `academicData.subjectData[${index}].marks[${
                                      testNum - 1
                                    }].score`,
                                    null
                                  );
                                  formik.setFieldValue(
                                    `academicData.subjectData[${index}].marks[${
                                      testNum - 1
                                    }].testNo`,
                                    testNum
                                  );
                                }
                              }}
                              placeholder={`Enter test [${testNum}] marks`}
                              min={0}
                              max={100}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
              </>
            )
          )}
        <div>
          <div className="form-group">
            <label htmlFor="sgpa">SGPA</label>
            <input
              type="number"
              id="sgpa"
              name="academicData.sgpa"
              value={
                formik.values.academicData.sgpa === 0
                  ? ""
                  : formik.values.academicData.sgpa
              }
              onChange={(e) => {
                let value = Number(e.target.value);

                // Restrict value to max 10 and min 0
                if (value >= 0 && value <= 10) {
                  formik.setFieldValue("academicData.sgpa", value);
                } else if (value < 0) {
                  formik.setFieldValue("academicData.sgpa", ""); // Reset to empty if less than 0
                }
              }}
              placeholder="Enter SGPA"
              min={0}
              max={10}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cgpa">CGPA</label>
            <input
              type="number"
              id="cgpa"
              name="academicData.cgpa"
              value={
                formik.values.academicData.cgpa === 0
                  ? ""
                  : formik.values.academicData.cgpa
              }
              onChange={(e) => {
                let value = Number(e.target.value);

                // Restrict value to max 10 and min 0
                if (value >= 0 && value <= 10) {
                  formik.setFieldValue("academicData.cgpa", value);
                } else if (value < 0) {
                  formik.setFieldValue("academicData.cgpa", ""); // Reset to empty if less than 0
                }
              }}
              placeholder="Enter CGPA"
              min={0}
              max={10}
            />
          </div>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="backlog">Backlog</label>
            <input
              type="number"
              id="backlog"
              name="academicData.backlog"
              value={
                formik.values.academicData.backlog === 0
                  ? ""
                  : formik.values.academicData.backlog
              }
              onChange={(e) => {
                let value = Number(e.target.value);

                // Restrict value to max 10 and min 0
                if (value >= 0 && value <= 10) {
                  formik.setFieldValue("academicData.backlog", value);
                } else if (value < 0) {
                  formik.setFieldValue("academicData.backlog", ""); // Reset to empty if less than 0
                }
              }}
              placeholder="Enter backlog"
              min={0}
              max={10}
            />
          </div>
          <div className="form-group">
            <label htmlFor="credits">Credits</label>
            <input
              type="number"
              id="credits"
              name="academicData.credits"
              value={
                formik.values.academicData.credits === 0
                  ? ""
                  : formik.values.academicData.credits
              }
              onChange={(e) => {
                let value = Number(e.target.value);

                // Restrict value to max 200 and min 0
                if (value >= 0 && value <= 200) {
                  formik.setFieldValue("academicData.credits", value);
                } else if (value < 0) {
                  formik.setFieldValue("academicData.credits", ""); // Reset to empty if less than 0
                }
              }}
              placeholder="Enter credits"
              min={0}
              max={200}
            />
          </div>
        </div>
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
              type="number"
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
              type="number"
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
      </form>
    </div>
  );
}
