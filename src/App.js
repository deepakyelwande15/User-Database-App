import React from "react";
import { Provider } from "react-redux";
import { Provider as JotaiProvider } from "jotai";
import store from "./redux";
import { studentsAtom } from "./atoms/studentAtoms";
import AddStudentForm from "./components/AddStudentForm";
import StudentTable from "./components/StudentTable";

function App() {
  return (
    <Provider store={store}>
      <JotaiProvider initialValues={[[studentsAtom]]}>
        <div className="App">
          <h1 style={{ textAlign: "center" }}>User Database App</h1>
          <AddStudentForm />
          <StudentTable />
        </div>
      </JotaiProvider>
    </Provider>
  );
}

export default App;
