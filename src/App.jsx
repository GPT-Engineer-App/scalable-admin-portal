import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProjectList from "./pages/ProjectList.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import EditProject from "./pages/EditProject.jsx";
import UserList from "./pages/UserList.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import CreateUser from "./pages/CreateUser.jsx";
import EditUser from "./pages/EditUser.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;