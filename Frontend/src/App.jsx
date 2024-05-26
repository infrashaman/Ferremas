import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { TaskFormPage } from "./pages/TaskFormPage";
import { TasksPage } from "./pages/TasksPage";
import { Toaster } from "react-hot-toast";
import { createCarro } from "./Functions/carros.api";

function App() {
  useEffect(() => {
    const carroId = localStorage.getItem("carroId");
    if (!carroId) {
      createCarro({}).then((response) => {
        localStorage.setItem("carroId", response.data.id);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          {/* redirect to tasks */}
          <Route path="/" element={<Navigate to="/productos" />} />
          <Route path="/productos" element={<TasksPage />} />
          <Route path="/productos/:id" element={<TaskFormPage />} />
          <Route path="/productos-create" element={<TaskFormPage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
