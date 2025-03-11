import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <Container maxWidth="xl" sx={{ pt: "24px", flexGrow: 1 }}>
        <Outlet />
      </Container>
    </div>
  );
}
