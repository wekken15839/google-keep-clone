import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import SideBarProvider from "./context/SideBarProvider";
import NotesProvider from "./context/NotesProvider";
import SelectLabelForNotePage from "./pages/SelectLabelForNotePage";
import SelectLabelForNotesPage from "./pages/SelectLabelForNotesPage";
import CreateLabelPage from "./pages/CreateLabelPage";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import LabelsPage from "./pages/LabelsPage";

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
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes/:noteId"
                  element={
                    <ProtectedRoute>
                      <NotesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes/select-label"
                  element={
                    <ProtectedRoute>
                      <SelectLabelForNotesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes/:noteId/select-label"
                  element={
                    <ProtectedRoute>
                      <SelectLabelForNotePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/labels/:labelId"
                  element={
                    <ProtectedRoute>
                      <LabelsPage />
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
