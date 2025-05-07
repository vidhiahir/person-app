import { Navigate, Route, Routes } from "react-router-dom";
import PersonAdd from "./components/PersonAdd";
import PersonHome from "./components/PersonHome";
import PersonList from "./components/PersonList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<PersonHome />} />
      <Route path="/add" element={<PersonAdd />} />
      <Route path="/list" element={<PersonList />} />
    </Routes>
  );
};

export default App;
