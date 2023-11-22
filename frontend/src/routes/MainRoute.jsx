import { Route, Routes } from "react-router-dom";
import { AllTodo } from "../pages/AllTodo";
import { AddTodo } from "../pages/AddTodo";
import { UpdateTodo } from "../pages/UpdateTodo";

export const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AllTodo />} />
      <Route path="/add" element={<AddTodo />} />
      <Route path="/update/:id" element={<UpdateTodo />} />
    </Routes>
  );
};

export default MainRoute;
