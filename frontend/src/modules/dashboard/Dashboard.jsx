import { useAuth } from "../auth/AuthContext.jsx";
import StudentDashboard from "./StudentDashboard.jsx";
import LibrarianDashboard from "./LibrarianDashboard.jsx";

const Dashboard = () => {
  const { user } = useAuth();

  if (["admin", "assistant", "librarian"].includes(user?.role)) {
    return <LibrarianDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;

