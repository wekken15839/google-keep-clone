import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import SideBarProvider from "./context/SideBarProvider";
import NotesProvider from "./context/NotesProvider";
import Notes from "./pages/Notes";
import Labels from "./pages/Labels";
import SelectLabel from "./pages/SelectLabelForNote";
import SelectLabelForNote from "./pages/SelectLabelForNote";
import SelectLabelForNotes from "./pages/SelectLabelForNotes";
import CreateLabelPage from "./pages/CreateLabelPage";

// todos [] cambiar iconos de cada task
// todos [] agregar funcionalidad de eliminar cada task

function App() {
  return (
    <>
      <AuthProvider>
        <SideBarProvider>
          <NotesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route
                  path="/notes"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes/:noteId"
                  element={
                    <ProtectedRoute>
                      <Notes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes/select-label"
                  element={
                    <ProtectedRoute>
                      <SelectLabelForNotes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes/:noteId/select-label"
                  element={
                    <ProtectedRoute>
                      <SelectLabelForNote />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/labels/:labelId"
                  element={
                    <ProtectedRoute>
                      <Labels />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/labels/create-label"
                  element={
                    <ProtectedRoute>
                      <CreateLabelPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </NotesProvider>
        </SideBarProvider>
      </AuthProvider>
    </>
  );
}

export default App;
