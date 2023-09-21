const initialState = {
  students: [],
};
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STUDENT":
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case "REMOVE_STUDENT":
      const updatedStudents = [...state.students];
      updatedStudents.splice(action.payload, 1);
      return {
        ...state,
        students: updatedStudents,
      };
    case "EDIT_STUDENT":
      const EditedStudents = [...state.students];
      EditedStudents[action.payload.index].name = action.payload.editedName;
      EditedStudents[action.payload.index].age = action.payload.editedage;
      return {
        ...state,
        students: EditedStudents,
      };
    default:
      return state;
  }
};

export default studentReducer;
