import React from "react";
import { useDispatch } from "react-redux";
import { studentsAtom } from "../atoms/studentAtoms";
import { useAtom } from "jotai";
import "./AddStudentForm.css";
import { v4 as uuid } from "uuid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddStudentForm = () => {
  const runique_id = uuid();
  const junique_id = uuid();
  const rsmall_id = runique_id.slice(0, 8);
  const jsmall_id = junique_id.slice(0, 8);

  const dispatch = useDispatch();
  const [students, setStudents] = useAtom(studentsAtom);

  // Validation using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name should be at least 3 characters")
      .max(25, "Name should not exceed 25 characters")
      .matches(/^[a-zA-Z\s]*$/, "Name should not contain number"),
    age: Yup.number()
      .required("Age is required")
      .integer("Age should be a whole number")
      .positive("Age should be a positive number")
      .min(0, "Age should be greater than or equal to 0")
      .max(99, "Age should be less than or equal to 99"),
    schoolName: Yup.string()
      .required("School Name is required")
      .matches(
        /^[a-zA-Z\s]{3,}$/,
        "School Name should contain at least three letters"
      ),
    grade: Yup.string()
      .required("Grade is required")
      .max(6, "Grade should not be more than 6 characters"),
  });

  const handleAddStudent = (values) => {
    const newStudent = {
      name: values.name,
      age: values.age,
      schoolName: values.schoolName,
      class: values.studentClass,
      grade: values.grade,
      jsmall_id,
    };

    dispatch({ type: "ADD_STUDENT", payload: newStudent });

    setStudents([
      ...students,
      {
        name: values.name,
        age: values.age,
        schoolName: values.schoolName,
        class: values.studentClass,
        grade: values.grade,
        rsmall_id,
      },
    ]);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          age: "",
          schoolName: "",
          studentClass: "",
          grade: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleAddStudent(values);
          resetForm();
        }}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div>
              <label htmlFor="name">
                Name<span>*</span>
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter student name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="age">
                Age<span>*</span>
              </label>
              <Field
                type="number"
                id="age"
                name="age"
                placeholder="Enter student age"
              />
              <ErrorMessage name="age" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="schoolName">
                School Name<span>*</span>
              </label>
              <Field
                type="text"
                id="schoolName"
                name="schoolName"
                placeholder="Enter school name"
              />
              <ErrorMessage
                name="schoolName"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label htmlFor="studentClass">
                Class<span>*</span>
              </label>
              <Field
                type="text"
                id="studentClass"
                name="studentClass"
                placeholder="Enter class"
              />
              <ErrorMessage
                name="studentClass"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label htmlFor="grade">
                Grade<span>*</span>
              </label>
              <Field
                type="text"
                id="grade"
                name="grade"
                placeholder="Enter grade"
              />
              <ErrorMessage name="grade" component="div" className="error" />
            </div>
            <button
              className={`button ${
                !(isValid && dirty) ? "disabled-button" : ""
              }`}
              type="submit"
              disabled={!(isValid && dirty)}
            >
              Add Student
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStudentForm;

