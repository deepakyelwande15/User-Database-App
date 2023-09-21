import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentsAtom } from "../atoms/studentAtoms";
import { useAtom } from "jotai";
import "./StudentTable.css";
import { useState } from "react";
import TableHead from "./TableHead";

const StudentTable = () => {
  const _students = useSelector((state) => state.students);
  const [atomStudents] = useAtom(studentsAtom);
  const dispatch = useDispatch();
  const [jeditIndex, setjeditIndex] = useState(-1);
  const [editIndex, seteditIndex] = useState(-1);
  const [editedName, seteditedName] = useState("");
  const [jeditedName, setjeditedName] = useState("");
  const [jeditedage, setjeditedage] = useState("");
  const [editedage, seteditedage] = useState("");
  const [students, setStudents] = useAtom(studentsAtom);

  const handleSaveStudent = (index) => {
    const updatedStudents = [...atomStudents];
    updatedStudents[index].name = jeditedName;
    updatedStudents[index].age = jeditedage;
    setStudents(updatedStudents);
    setjeditIndex(-1); 
  };
  const handleSaveStudentInRedux = (index) => {
    dispatch({
      type: "EDIT_STUDENT",
      payload: {
        editedName,
        editedage,
        index,
      },
    });
    seteditIndex(-1);
  };
  const handleDeleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1); 
    setStudents(updatedStudents); 
  };

  return (
    <div className="student-table-container">
      {_students.length > 0 && (
        <>
          <h2 className="table-title">Student List (Redux)</h2>
          <table className="student-table">
            <TableHead />
            <tbody>
              {_students.map((student, index) => (
                <tr key={student.jsmall_id}>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editedName}
                        required
                        id="iname"
                        name="iname"
                        onChange={(e) => seteditedName(e.target.value)}
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        required
                        value={editedage}
                        id="iage"
                        name="aiage"
                        onChange={(e) => seteditedage(e.target.value)}
                      />
                    ) : (
                      student.age
                    )}
                  </td>
                  <td>{student.schoolName}</td>
                  <td>{student.class}</td>
                  <td>{student.grade}</td>
                  <td>
                    {editIndex === index ? (
                      <button
                        id="saveredux"
                        key={"saveredux"}
                        onClick={() => handleSaveStudentInRedux(index)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        id="editredux"
                        key={"editredux"}
                        onClick={() => seteditIndex(index)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_STUDENT", payload: index })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {atomStudents.length > 0 ? (
        <>
          <h2 className="table-title">Student List (Jotai)</h2>
          <table className="student-table">
            <TableHead />
            <tbody>
              {atomStudents.map((student, index) => (
                <tr key={student.rsmall_id}>
                  <td>
                    {jeditIndex === index ? (
                      <input
                        type="text"
                        required
                        id="jotainame"
                        name="jotainame"
                        value={jeditedName}
                        onChange={(e) => setjeditedName(e.target.value)}
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                  <td>
                    {jeditIndex === index ? (
                      <input
                        type="text"
                        value={jeditedage}
                        onChange={(e) => setjeditedage(e.target.value)}
                        required
                        id="jotaiage"
                        name="jotaiage"
                      />
                    ) : (
                      student.age
                    )}
                  </td>
                  <td>{student.schoolName}</td>
                  <td>{student.class}</td>
                  <td>{student.grade}</td>
                  <td>
                    {jeditIndex === index ? (
                      <button
                        key={"editjotai"}
                        id="editjotai"
                        onClick={() => handleSaveStudent(index)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        key={"editeditjotai1"}
                        id="editeditjotai1"
                        onClick={() =>  setjeditIndex(index)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteStudent(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default StudentTable;

