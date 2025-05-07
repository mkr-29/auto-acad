import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { StudentService } from "../../../Services/StudentService";

export default function AcademicsDataForm({
  submitPayload,
  setSubmitPayload,
  setStep,
  loading,
  setLoading,
}) {
  const formik = useFormik({
    initialValues: {
      academicsData: {
        subjectCount: 0,
        sgpa: 0,
        cgpa: 0,
        backlog: 0,
        credits: 0,
        subjectsData: [],
      },
    },
    onSubmit: (values) => {
      handleSubmit();
      setStep(4);
    },
  });

  const addSubject = async (subjectsData, i) => {
    const payload = {
      subjectName: subjectsData.subjectName,
      subjectCode: subjectsData.subjectCode,
      subjectFaculty: subjectsData.subjectFaculty,
      credits: subjectsData.credits,
      subjectType: subjectsData.subjectType,
      attendance: subjectsData.attendance,
      noOfTests: subjectsData.noOfTests,
      marks: subjectsData.marks || []
    };

    // Validate required fields
    if (!payload.subjectName || !payload.subjectCode || !payload.subjectFaculty) {
      toast.error("Please fill all required subject fields.");
      return { success: false, message: "Missing required fields" };
    }

    setLoading(true);

    try {
      const response = await StudentService.addSubject(payload);

      const { data, success } = response;
      if (success) {
        // Update the submitPayload with the new subject data
        setSubmitPayload(prev => ({
          ...prev,
          studentData: {
            ...prev.studentData,
            academicsData: {
              ...prev.studentData.academicsData,
              subjectsData: [
                ...prev.studentData.academicsData.subjectsData,
                {
                  subjectId: data,
                  subjectNo: i + 1,
                }
              ]
            }
          }
        }));

        return response;
      } else {
        return response;
      }
    } catch (error) {
      toast.error("Error adding subject!");
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const subjectData = formik.values.academicsData.subjectsData;
    // Remove subjectsData from formik.values.academicsData
    formik.setFieldValue("academicsData.subjectsData", []);
    
    setSubmitPayload((prev) => ({
      ...prev,
      studentData: {
        ...prev.studentData,
        academicsData: {
          ...formik.values.academicsData,
          subjectsData: []
        },
      },
    }));

    if (formik.values.academicsData.subjectCount > 0) {
      for (let i = 0; i < formik.values.academicsData.subjectCount; i++) {
        await addSubject(subjectData[i], i);
      }
    }
  };

  return (
    <>
      <h4 style={{ color: "white" }}>Academic Data</h4>
      <div>
        <div className="form-group">
          <label htmlFor="sgpa">SGPA</label>
          <input
            type="number"
            id="sgpa"
            name="academicsData.sgpa"
            value={
              formik.values.academicsData.sgpa === 0
                ? ""
                : formik.values.academicsData.sgpa
            }
            onChange={(e) => {
              let value = Number(e.target.value);

              // Restrict value to max 10 and min 0
              if (value >= 0 && value <= 10) {
                formik.setFieldValue("academicsData.sgpa", value);
              } else if (value < 0) {
                formik.setFieldValue("academicsData.sgpa", ""); // Reset to empty if less than 0
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
            name="academicsData.cgpa"
            value={
              formik.values.academicsData.cgpa === 0
                ? ""
                : formik.values.academicsData.cgpa
            }
            onChange={(e) => {
              let value = Number(e.target.value);

              // Restrict value to max 10 and min 0
              if (value >= 0 && value <= 10) {
                formik.setFieldValue("academicsData.cgpa", value);
              } else if (value < 0) {
                formik.setFieldValue("academicsData.cgpa", ""); // Reset to empty if less than 0
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
          <label htmlFor="credits">Credits Earned</label>
          <input
            type="number"
            id="credits"
            name="academicsData.credits"
            value={
              formik.values.academicsData.credits === 0
                ? ""
                : formik.values.academicsData.credits
            }
            onChange={(e) => {
              let value = Number(e.target.value);

              // Restrict value to max 200 and min 0
              if (value >= 0 && value <= 200) {
                formik.setFieldValue("academicsData.credits", value);
              } else if (value < 0) {
                formik.setFieldValue("academicsData.credits", ""); // Reset to empty if less than 0
              }
            }}
            placeholder="Enter credits"
            min={0}
            max={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="backlog">Backlog</label>
          <input
            type="number"
            id="backlog"
            name="academicsData.backlog"
            value={
              formik.values.academicsData.backlog === 0
                ? ""
                : formik.values.academicsData.backlog
            }
            onChange={(e) => {
              let value = Number(e.target.value);

              // Restrict value to max 10 and min 0
              if (value >= 0 && value <= 10) {
                formik.setFieldValue("academicsData.backlog", value);
              } else if (value < 0) {
                formik.setFieldValue("academicsData.backlog", ""); // Reset to empty if less than 0
              }
            }}
            placeholder="Enter backlog"
            min={0}
            max={10}
          />
        </div>
      </div>

      <div>
        <div className="form-group">
          <label htmlFor="subjectCount">Number of Subjects</label>
          <input
            type="number"
            id="subjectCount"
            name="academicsData.subjectCount"
            value={
              formik.values.academicsData.subjectCount === 0
                ? ""
                : formik.values.academicsData.subjectCount
            }
            onChange={(e) => {
              let value = Number(e.target.value);

              // Restrict value to max 10 and min 1
              if (value >= 1 && value <= 10) {
                formik.setFieldValue("academicsData.subjectCount", value);
              } else if (value < 1) {
                formik.setFieldValue("academicsData.subjectCount", ""); // Reset to empty if less than 1
              }
            }}
            placeholder="Enter number of subjects"
            min={1}
            max={10}
          />
        </div>
      </div>

      {/* Add subjectsData fields as per subjectCount */}
      {formik.values.academicsData.subjectCount > 0 &&
        Array.from({ length: formik.values.academicsData.subjectCount }).map(
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
                    name={`academicsData.subjectsData[${index}]name`}
                    value={
                      formik.values.academicsData.subjectsData[index]
                        ?.subjectName || ""
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      formik.setFieldValue(
                        `academicsData.subjectsData[${index}].subjectName`,
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
                    name={`academicsData.subjectsData[${index}]code`}
                    value={
                      formik.values.academicsData.subjectsData[index]
                        ?.subjectCode || ""
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      formik.setFieldValue(
                        `academicsData.subjectsData[${index}].subjectCode`,
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
                    name={`academicsData.subjectsData[${index}]faculty`}
                    value={
                      formik.values.academicsData.subjectsData[index]
                        ?.subjectFaculty || ""
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      formik.setFieldValue(
                        `academicsData.subjectsData[${index}].subjectFaculty`,
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
                    name={`academicsData.subjectsData[${index}]credits`}
                    value={
                      formik.values.academicsData.subjectsData[index]?.credits ||
                      ""
                    }
                    onChange={(e) => {
                      let value = Number(e.target.value);

                      // Restrict value to max 10 and min 0
                      if (value >= 0 && value <= 10) {
                        formik.setFieldValue(
                          `academicsData.subjectsData[${index}].credits`,
                          value
                        );
                      } else if (value < 0) {
                        formik.setFieldValue(
                          `academicsData.subjectsData[${index}].credits`,
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
                    name={`academicsData.subjectsData[${index}]type`}
                    value={
                      formik.values.academicsData.subjectsData[index]
                        ?.subjectType || ""
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      formik.setFieldValue(
                        `academicsData.subjectsData[${index}].subjectType`,
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
                    name={`academicsData.subjectsData[${index}]attendance`}
                    value={
                      formik.values.academicsData.subjectsData[index]
                        ?.attendance || ""
                    }
                    onChange={(e) => {
                      let value = Number(e.target.value);

                      // Restrict value to max 100 and min 0
                      if (value >= 0 && value <= 100) {
                        formik.setFieldValue(
                          `academicsData.subjectsData[${index}].attendance`,
                          value
                        );
                      } else if (value < 0) {
                        formik.setFieldValue(
                          `academicsData.subjectsData[${index}].attendance`,
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
                    name={`academicsData.subjectsData[${index}]noOfTests`}
                    value={
                      formik.values.academicsData.subjectsData[index]
                        ?.noOfTests || ""
                    }
                    onChange={(e) => {
                      let value = Number(e.target.value);

                      // Restrict value to max 10 and min 0
                      if (value >= 0 && value <= 10) {
                        formik.setFieldValue(
                          `academicsData.subjectsData[${index}].noOfTests`,
                          value
                        );
                      } else if (value < 0) {
                        formik.setFieldValue(
                          `academicsData.subjectsData[${index}].noOfTests`,
                          "" // Reset to empty if less than 0
                        );
                      }
                    }}
                    placeholder="Enter no. of tests"
                    min={0}
                    max={10}
                  />
                </div>
                {formik.values.academicsData.subjectsData[index]?.noOfTests >
                  0 && (
                  <div className="form-group">
                    <label htmlFor={`subject${index + 1}test1marks`}>
                      Subject [{index + 1}] Test [1] Marks
                    </label>
                    <input
                      type="number"
                      id={`subject${index + 1}test1marks`}
                      name={`academicsData.subjectsData[${index}].marks[0].score`}
                      value={
                        formik.values.academicsData?.subjectsData[index]
                          ?.marks?.[0]?.score || ""
                      }
                      onChange={(e) => {
                        let value = Number(e.target.value);

                        if (
                          !formik.values.academicsData.subjectsData[index]?.marks
                        ) {
                          formik.setFieldValue(
                            `academicsData.subjectsData[${index}].marks`,
                            []
                          );
                        }

                        // Restrict value between 0 and 100
                        if (value >= 0 && value <= 100) {
                          formik.setFieldValue(
                            `academicsData.subjectsData[${index}].marks[0]`,
                            { score: value, testNo: 1 }
                          );
                        } else if (value < 0) {
                          formik.setFieldValue(
                            `academicsData.subjectsData[${index}].marks[0]`,
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
              {formik.values.academicsData.subjectsData[index]?.noOfTests > 1 &&
                Array.from({
                  length:
                    formik.values.academicsData.subjectsData[index]?.noOfTests -
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
                            name={`academicsData.subjectsData[${index}].test${testNum}Marks`}
                            value={
                              formik.values.academicsData.subjectsData[index]
                                ?.marks?.[testNum - 1]?.score || ""
                            }
                            onChange={(e) => {
                              let value = Number(e.target.value);

                              // Restrict value between 0 and 100
                              if (value >= 0 && value <= 100) {
                                formik.setFieldValue(
                                  `academicsData.subjectsData[${index}].marks[${
                                    testNum - 1
                                  }].score`,
                                  value
                                );
                                formik.setFieldValue(
                                  `academicsData.subjectsData[${index}].marks[${
                                    testNum - 1
                                  }].testNo`,
                                  testNum
                                );
                              } else if (value < 0) {
                                formik.setFieldValue(
                                  `academicsData.subjectsData[${index}].marks[${
                                    testNum - 1
                                  }].score`,
                                  null
                                );
                                formik.setFieldValue(
                                  `academicsData.subjectsData[${index}].marks[${
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
