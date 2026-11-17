// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Container, Card } from "react-bootstrap";
// import { FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Navbar from "./Navbar";
// import Sidevar from "./Sidevar";

// const DashBoard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Remove login data
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // Show notification
//     toast.success("Logout successful!");

//     // Redirect to Login
//     setTimeout(() => {
//       navigate("/", { replace: true });
//     }, 1000);
//   };

//   return (
//     <div>
//       <div>
//         <Navbar />
//       </div>
//       <Container fluid className="bg-light min-vh-100 p-4">
//         <Sidevar />
//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h3 className="fw-bold">
//             <FaTachometerAlt className="me-2 text-primary" />
//             Admin Dashboard
//           </h3>

//           <Button variant="danger" onClick={handleLogout}>
//             <FaSignOutAlt className="me-2" />
//             Logout
//           </Button>
//         </div>

//         {/* Dashboard Content */}
//         <Card className="shadow-sm border-0 rounded-4">
//           <Card.Body className="p-5 text-center">
//             <h2 className="fw-bold text-primary">Welcome to Dashboard!</h2>

//             <p className="text-muted mt-3">You have successfully logged in.</p>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default DashBoard;

import React, { useState } from "react";

import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidevar";
import DashBoardRoutes from "../../routes/DashBoardRoutes";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="min-h-screen lg:ml-64">
        {/* Navbar */}
        <header className="flex h-16 items-center gap-4 bg-white px-6 shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-xl text-gray-700 lg:hidden"
          >
            <FaBars />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div>
            <DashBoardRoutes />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
